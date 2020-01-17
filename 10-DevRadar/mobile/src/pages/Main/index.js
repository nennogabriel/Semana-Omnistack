import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";

import MapView, { Marker, Callout } from "react-native-maps";

import { MaterialIcons } from "@expo/vector-icons";

import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
import api from "../../services/api";

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [keyboardHeight, setKeyboardHeight] = useState(20);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        setCurrentRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        });
      }
    }
    loadInitialPosition();
  }, []);

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data);
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }
  Keyboard.addListener("keyboardDidShow", e => {
    setKeyboardHeight(e.endCoordinates.height + 50);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardHeight(20);
  });

  return (
    <>
      <Map initialRegion={currentRegion} onRegionChange={handleRegionChanged}>
        {devs &&
          devs.map(dev => (
            <Marker
              coordinate={{
                latitude: dev.location.coordinates[0],
                longitude: dev.location.coordinates[1]
              }}
              key={dev._id}
            >
              <Img
                source={{
                  uri: dev.avatar_url
                }}
              />
              <Callout
                onPress={() => {
                  navigation.navigate("Profile", {
                    github_username: dev.github_username
                  });
                }}
              >
                <CalloutContainer>
                  <DevName>{dev.name}</DevName>
                  <DevBio>{dev.bio}</DevBio>
                  <DevTechs>{dev.techs.join(", ")}</DevTechs>
                </CalloutContainer>
              </Callout>
            </Marker>
          ))}
      </Map>
      <SearchForm keyboardHeight={keyboardHeight}>
        <Input value={techs} onChangeText={setTechs} />
        <Button onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </Button>
      </SearchForm>
    </>
  );
}

const Map = styled(MapView)`
  flex: 1;
`;

const Img = styled.Image`
  width: 54px;
  height: 54px;
  border-width: 3px;
  border-color: #333;
`;

const CalloutContainer = styled.View`
  width: 260px;
`;

const DevName = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
const DevBio = styled.Text`
  color: #666;
  margin-top: 5px;
`;

const DevTechs = styled.Text`
  margin-top: 5px;
`;

const SearchForm = styled.View`
  position: absolute;
  bottom: ${props => props.keyboardHeight}px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;

const Input = styled.TextInput.attrs({
  placeholder: "Filtrar Techs aqui",
  placeholderTextColor: "#999",
  autoCapitalize: "words",
  autoCorrect: false
})`
  flex: 1;
  height: 50px;
  background-color: #fff;
  color: #333;
  border-radius: 25px;
  padding: 8px 16px;
  font-size: 16px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  elevation: 2;
`;

const Button = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: #8e4dff;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

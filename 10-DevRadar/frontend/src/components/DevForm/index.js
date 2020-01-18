import React, { useState, useEffect } from "react";

import "./styles.css";

export default function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [randomize, setRandomize] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { coords } = position;
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      },
      err => {
        console.log("erro geo: ", err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubUsername("");
    // setTechs("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usurário do Github</label>
        <input
          type="text"
          name="github_username"
          id="github_username"
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">Techs</label>
        <input
          type="text"
          name="techs"
          id="techs"
          value={techs}
          onChange={e => setTechs(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            required
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="input-block checkbox">
        <label htmlFor="randomize">Random place nearby</label>
        <input
          type="checkbox"
          name="randomize"
          id="randomize"
          checked={randomize}
          onClick={e => setRandomize(!randomize)}
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

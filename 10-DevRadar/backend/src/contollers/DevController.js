const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringToArray = require("../utils/parseStringToArray");
const { findConnections, sendMessage } = require("../websocket");

class DevController {
  async store(request, response) {
    const {
      github_username,
      techs: techsString,
      latitude,
      longitude
    } = request.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const techs = parseStringToArray(techsString);

      const location = {
        type: "Point",
        coordinates: [latitude, longitude]
      };

      const { name = login, avatar_url, bio } = (
        await axios.get(`http://api.github.com/users/${github_username}`)
      ).data;

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techs
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }
    return response.json(dev);
  }

  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  }

  async exclude(request, response) {
    const dev = await Dev.findById(request.params.id);
    const [latitude, longitude] = dev.location.coordinates;

    const sendSocketMessageTo = findConnections(
      { latitude, longitude },
      dev.techs
    );
    sendMessage(sendSocketMessageTo, "exclude-dev", dev);

    await Dev.deleteOne({ _id: request.params.id });
    return response.json({ ok: true });
  }
}

module.exports = new DevController();

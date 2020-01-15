const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringToArray = require("../utils/parseStringToArray");

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

      const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs,
        location
      });
    }
    return response.json(dev);
  }

  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  }
}

module.exports = new DevController();

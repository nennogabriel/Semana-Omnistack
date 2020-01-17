const Dev = require("../models/Dev");
const parseStringToArray = require("../utils/parseStringToArray");

class SearchController {
  async index(request, response) {
    const { latitude, longitude, techs: techsString } = request.query;
    const techs = parseStringToArray(techsString);
    const devs = await Dev.find({
      techs: {
        $in: techs
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [latitude, longitude]
          },
          $maxDistance: 10000 // 10km
        }
      }
    });
    return response.json(devs);
  }
}

module.exports = new SearchController();

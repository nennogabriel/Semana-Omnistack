const Dev = require("../models/Dev");
const parseStringToArray = require("../utils/parseStringToArray");

class SearchController {
  async index(request, response) {
    const { latitude, logitude, techs: techsString } = request.query;
    const techs = parseStringToArray(techsString);
    const devs = await Dev.find({
      techs: {
        $in: techs
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000 // 10km
        }
      }
    });
    return response.json();
  }
}

module.exports = new SearchController();

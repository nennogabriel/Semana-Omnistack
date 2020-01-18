const { Router } = require("express");

const DevController = require("./contollers/DevController");
const SearchController = require("./contollers/SearchController");

const routes = Router();

routes.get("/devs/", DevController.index);
routes.post("/devs/", DevController.store);
routes.delete("/devs/:id", DevController.exclude);

routes.get("/search/", SearchController.index);

module.exports = routes;

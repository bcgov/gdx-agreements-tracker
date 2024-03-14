const model = require("@models/projects/lessons_learned");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@facilities/keycloak.js");
jest.mock("@models/projects/lessons_learned");

testRoutes([
  {
    request: { method: "GET", url: "/projects/1/lessons-learned" },
    modelFunction: model.findAllById,
    capabilities: ["projects_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/projects/1/lessons-learned/1" },
    modelFunction: model.findById,
    capabilities: ["projects_read_all"],
    type: routeTypes.Specific,
  },
]);

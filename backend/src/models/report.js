const { default: knex } = require("knex");
const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const project_milestone = `${dbConnection.dataBaseSchemas().data}.project_milestone`;
const project = `${dbConnection.dataBaseSchemas().data}.project`;
const health_indicator = `${dbConnection.dataBaseSchemas().data}.health_indicator`;

// Get all.
const findAll = () => {
  return db
    .distinct()
    .select(
      "subquery.id",
      "project.id as ProjectID",
      db.raw("(CASE WHEN subquery.id IsNull THEN 'No Milestones' ELSE subquery.description END) AS Description"),
      "subquery.target_completion_date",
      "subquery.status",
      "subquery.actual_completion_date",
      "subquery.colour_red",
      "subquery.colour_green",
      "subquery.colour_blue"
    )
    .from(project)
    .leftJoin(
      function () {
        this.select(
          "project_milestone.*",
          "health_indicator.colour_red",
          "health_indicator.colour_green",
          "health_indicator.colour_blue",
        )
          .from(project_milestone)
          .rightJoin(health_indicator, { "health_indicator.id": "project_milestone.health_id" })
          .as("subquery");
      },
      { "project.id": "subquery.project_id" }
    )
};

// Get specific one by id.
const findById = (projectId) => {
  return db
    .distinct()
    .select(
      "subquery.id",
      "project.id as ProjectID",
      db.raw("(CASE WHEN subquery.id IsNull THEN 'No Milestones' ELSE subquery.description END) AS Description"),
      "subquery.target_completion_date",
      "subquery.status",
      "subquery.actual_completion_date",
      "subquery.colour_red",
      "subquery.colour_green",
      "subquery.colour_blue"
    )
    .from(project)
    .leftJoin(
      function () {
        this.select(
          "project_milestone.*",
          "health_indicator.colour_red",
          "health_indicator.colour_green",
          "health_indicator.colour_blue",
        )
          .from(project_milestone)
          .rightJoin(health_indicator, { "health_indicator.id": "project_milestone.health_id" })
          .as("subquery");
      },
      { "project.id": "subquery.project_id" }
    )
    .where({"project.id": projectId})
};

module.exports = {
  findAll,
  findById,
};

const { default: knex } = require("knex");
const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

//const table = "report";
const project_milestone = `${dbConnection.dataBaseSchemas().data}.project_milestone`;
const project = `${dbConnection.dataBaseSchemas().data}.project`;
const health_indicator = `${dbConnection.dataBaseSchemas().data}.health_indicator`;

// Get specific one by id.
const findAll = (projectId) => {
  return (
    db
      .distinct()
      .select(
        "project_milestone.id",
        "project.id as ProjectID",
        db.raw(
          "(CASE WHEN project_milestone.id IsNull THEN 'No Milestones' ELSE project_milestone.description END) AS Description"
        ),
        "project_milestone.target_completion_date",
        "project_milestone.status",
        "project_milestone.actual_completion_date",
        "health_indicator.colour_red",
        "health_indicator.colour_green",
        "health_indicator.colour_blue"
      )
      .from(project)
      //.leftJoin('data.project_milestone', {'project.id': 'project_milestone.project_id'})
      // .leftJoin(
      //   function () {
      //     this.select("health_indicator.*")
      //       .from("data.health_indicator")
      //       .rightJoin("data.project_milestone", {"health_indicator.id": "project_milestone.health_id"})
      //       .as("health_indicator")
      //   },
      //   { "project.id": "health_indicator.id" }
      // )
      
      //This NEARLY works - but only returns projects which exist in the other tables
      .rightJoin(project_milestone, "project_milestone.project_id", "=", "project.id")
      .leftJoin(health_indicator, "health_indicator.id", "=", "project_milestone.health_id")
    //.orderBy("ProjectID")
  );
};

module.exports = {
  findAll,
};

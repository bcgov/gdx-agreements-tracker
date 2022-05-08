exports.up = function (knex) {
  function projectsWithDefault() {
    return knex.schema.alterTable("projects", function (table) {
      table.string("version").defaultTo("c3p0");
      table.string("client_ministry_name");
      table.date("registration_date");
      table.string("portfolio_name");
      table.date("planned_start_date");
      table.string("fiscal");
      table.date("planned_end_date");
      table.string("project_type");
      table.specificType("planned_budget", "money");
      table.string("project_status");
      table.string("funding");
      table.specificType("total_budget", "money");
      table.string("recovery_details");
      table.string("recoverable_total");
      table.string("contract_number");
      table.string("type");
      table.date("start_date");
      table.date("date_signed");
      table.string("end_date");
      table.string("description");
    });
  }

  function projectsWithoutDefault() {
    return knex.schema.alterTable("projects", function (table) {
      table.string("version").notNullable().alter();
    });
  }
  return projectsWithDefault().then(projectsWithoutDefault);
};

exports.down = function (knex) {
  return knex.schema.alterTable("projects", function (table) {
    table.dropColumn("version");
    table.dropColumn("client_ministry_name");
    table.dropColumn("registration_date");
    table.dropColumn("portfolio_name");
    table.dropColumn("planned_start_date");
    table.dropColumn("fiscal");
    table.dropColumn("planned_end_date");
    table.dropColumn("project_type");
    table.dropColumn("planned_budget");
    table.dropColumn("project_status");
    table.dropColumn("funding");
    table.dropColumn("total_budget");
    table.dropColumn("recovery_details");
    table.dropColumn("recoverable_total");
    table.dropColumn("contract_number");
    table.dropColumn("type");
    table.dropColumn("start_date");
    table.dropColumn("date_signed");
    table.dropColumn("end_date");
    table.dropColumn("description");
  });
};

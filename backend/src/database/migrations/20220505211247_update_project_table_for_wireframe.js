exports.up = function (knex) {
  return knex.schema.alterTable("projects", function (table) {
    table.string("version").notNullable();
    table.string("client_ministry_name").notNullable();
    table.date("registration_date").notNullable();
    table.string("portfolio_name").notNullable();
    table.date("planned_start_date").notNullable();
    table.string("fiscal").notNullable();
    table.date("planned_end_date").notNullable();
    table.string("project_type").notNullable();
    table.specificType("planned_budget", "money");
    table.string("project_status").notNullable();
    table.string("funding").notNullable();
    table.specificType("total_budget", "money");
    table.string("recovery_details").notNullable();
    table.string("recoverable_total").notNullable();
    table.string("contract_number").notNullable();
    table.string("type").notNullable();
    table.date("start_date").notNullable();
    table.date("date_signed").notNullable();
    table.string("end_date").notNullable();
    table.string("description").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("projects", function (table) {
    table.dropColumn("version").notNullable();
    table.dropColumn("client_ministry_name").notNullable();
    table.dropColumn("registration_dropColumn").notNullable();
    table.dropColumn("portfolio_name").notNullable();
    table.dropColumn("planned_start_dropColumn").notNullable();
    table.dropColumn("fiscal").notNullable();
    table.dropColumn("planned_end_dropColumn").notNullable();
    table.dropColumn("project_type").notNullable();
    table.dropColumn("planned_budget").notNullable();
    table.dropColumn("project_status").notNullable();
    table.dropColumn("funding").notNullable();
    table.dropColumn("total_budget").notNullable();
    table.dropColumn("recovery_details").notNullable();
    table.dropColumn("recoverable_total").notNullable();
    table.dropColumn("contract_number").notNullable();
    table.dropColumn("type").notNullable();
    table.dropColumn("start_dropColumn").notNullable();
    table.dropColumn("dropColumn_signed").notNullable();
    table.dropColumn("end_dropColumn").notNullable();
    table.dropColumn("description").notNullable();
  });
};

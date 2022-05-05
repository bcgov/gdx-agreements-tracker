exports.up = function (knex) {
    return knex.schema.createTable("projects", function (table) {
      table.increments(); //id
      table.string("project_name").notNullable();
      table.string("project_number").notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("projects");
  };
  
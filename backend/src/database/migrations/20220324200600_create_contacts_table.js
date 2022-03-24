
exports.up = function(knex) {
    return knex.schema.createTable("contacts", function (table) {
        table.increments();//id
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("job_title");
        table.string("ministry_id");
        table.text("notes");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("contacts");
};

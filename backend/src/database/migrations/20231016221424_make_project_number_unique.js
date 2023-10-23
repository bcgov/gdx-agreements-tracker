exports.up = (knex) =>
  knex.raw(`
    ALTER TABLE data.project
    ADD CONSTRAINT project_number_unique UNIQUE (project_number);
  `);

exports.down = function (knex) {
  return knex.raw(`
    ALTER TABLE data.project
    DROP CONSTRAINT project_number_unique;
 `);
};

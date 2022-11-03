exports.up = function (knex) {
  return knex.raw(`
    ALTER TABLE data.contact_project
    ADD CONSTRAINT project_contact_role_unique UNIQUE (project_id, contact_id, contact_role);
  ;`);
};

exports.down = function (knex) {
  return knex.raw(`
    ALTER TABLE data.contact_project
    DROP CONSTRAINT project_contact_role_unique;
  ;`);
};

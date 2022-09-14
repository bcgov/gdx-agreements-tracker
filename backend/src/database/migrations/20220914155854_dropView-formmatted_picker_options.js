exports.up = function (knex) {
  //NOP as this is going to be simply a select statement in the picker_options model.
};

exports.down = function (knex) {
  return knex.raw(`DROP VIEW IF EXISTS public.formatted_picker_options;`);
};

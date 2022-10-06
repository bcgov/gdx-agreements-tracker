exports.up = function (knex) {
  return knex.raw(`DROP TABLE IF EXISTS public.user_roles;`);
};

exports.down = function (knex) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS public.user_roles
    (
        id integer NOT NULL DEFAULT nextval('user_roles_id_seq'::regclass),
        user_id integer,
        role_id integer,
        created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT user_roles_pkey PRIMARY KEY (id),
        CONSTRAINT user_roles_role_id_foreign FOREIGN KEY (role_id)
            REFERENCES public.roles (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION,
        CONSTRAINT user_roles_user_id_foreign FOREIGN KEY (user_id)
            REFERENCES public.users (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    )
  `);
};

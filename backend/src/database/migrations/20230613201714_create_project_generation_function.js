const project_generation_function = `
SET search_path = PUBLIC, data;
create or replace function data.get_project_number()
   returns varchar(6) 
   language plpgsql
  as
$$

declare 
  current_fiscal_year varchar(2);
  temp int;
  current_project_number varchar;
begin
 SET search_path = PUBLIC, data;
 select right(fiscal_year,2) from fiscal_year into current_fiscal_year where is_current;
 select cast(right(max(project_number),3) as int)+1 from project into temp where length(project_number)= 6;
 if length(trim((cast(temp as varchar)))) < 3 then
   current_project_number := '0' || cast(temp as varchar);
 else
   current_project_number := cast(temp as varchar);
 end if;
 return current_fiscal_year || '-' || current_project_number;
end;
$$;
`;

exports.up = function (knex) {
  return knex.raw(project_generation_function);
};

exports.down = function (knex) {
  return knex.raw(`DROP Function if exists get_project_number`);
};

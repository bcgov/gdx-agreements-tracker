import { TableComplete } from "components/TableComplete";
import React from "react";
import { readFields, editFields, initialValues } from "./fields";

export const BudgetSection = ({ projectId }: { projectId: number }) => {
  const roles = {
    get: "projects_read_all",
    add: "projects_add_one",
    update: "projects_update_one",
    delete: "projects_delete_one",
  };

  const url = {
    getAll: `projects/${projectId}/budget`,
    getOne: `projects/budget/{id}`,
    updateOne: `projects/budget/{id}`,
    addOne: `projects/budget`,
    deleteOne: `projects/budget/{id}`,
  };

  const columnWidths = {
    program_area: 2,
    financial_contact: 2,
    expense_authority_name: 2,
    responsibility_centre: 2,
  };

  return (
    <TableComplete
      itemName={"Budget"}
      tableName={"budget"}
      url={url}
      roles={roles}
      editFields={editFields(Number(projectId))}
      readFields={readFields}
      columnWidths={columnWidths}
      createFormInitialValues={initialValues}
    />
  );
};

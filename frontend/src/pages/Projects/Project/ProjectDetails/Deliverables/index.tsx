import { TableComplete } from "components/TableComplete";
import React from "react";
import { readFields, editFields, initialValues } from "./fields";

export const DeliverablesSection = ({ projectId }: { projectId: number }) => {
  const roles = {
    get: "projects_read_all",
    add: "projects_add_one",
    update: "projects_update_one",
    delete: "projects_delete_one",
  };

  const url = {
    getAll: `projects/${projectId}/deliverables`,
    getOne: `projects/deliverables/{id}`,
    updateOne: `projects/deliverables/{id}`,
    addOne: `projects/deliverables`,
  };

  const columnWidths = {
    program_area: 2,
    financial_contact: 2,
    expense_authority_name: 2,
    responsibility_centre: 2,
  };

  return (
    <TableComplete
      itemName={"Deliverables"}
      tableName={"deliverable"}
      url={url}
      roles={roles}
      editFields={editFields}
      readFields={readFields}
      columnWidths={columnWidths}
      createFormInitialValues={initialValues(Number(projectId))}
    />
  );
};

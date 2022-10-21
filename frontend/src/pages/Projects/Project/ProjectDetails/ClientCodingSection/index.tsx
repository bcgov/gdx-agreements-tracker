import { TableComplete } from "components/TableComplete";
import React from "react";
import { readFields, editFields, initialValues } from "./fields";

export const ClientCodingSection = ({ projectId }: { projectId: number }) => {
  const roles = {
    get: "projects_read_all",
    add: "projects_add_one",
    update: "projects_update_one",
    delete: "projects_delete_one",
  };

  const url = {
    getAll: `projects/${projectId}/client-coding`,
    getOne: `projects/client-coding/{id}`,
    updateOne: `projects/client-coding/{id}`,
    addOne: `projects/${projectId}/client-coding`,
    deleteOne: `projects/client-coding/{id}`,
  };

  return (
    <TableComplete
      itemName={"Client Coding"}
      tableName={"client-coding"}
      url={url}
      roles={roles}
      editFields={editFields}
      readFields={readFields}
      createFormInitialValues={initialValues}
    />
  );
};

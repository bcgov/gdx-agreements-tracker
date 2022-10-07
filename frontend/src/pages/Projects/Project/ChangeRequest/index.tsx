import React from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";
import { TableComplete } from "components/TableComplete";

/**
 * @returns  the jsx for the change request section of the project form
 */

export const ChangeRequest = () => {
  const { projectId } = useParams();
  const roles = {
    get: "projects_read_all",
    add: "projects_add_one",
    update: "projects_update_one",
    delete: "projects_delete_one",
  };

  const url = {
    getAll: `projects/${projectId}/change_request`,
    getOne: `projects/${projectId}/change_request/{id}`,
    updateOne: `change_request/{id}`,
    addOne: `/change_request`,
    deleteOne: `change_request/{id}`,
  };

  const createFormInitialValues = {
    approval_date: null,
    cr_contact: "",
    fiscal_year: null,
    initiated_by: null,
    initiation_date: null,
    link_id: Number(projectId),
    summary: "",
  };

  const columnWidths = {};

  return (
    <>
      <TableComplete
        itemName="Change Request"
        tableName="lessons-learned"
        columnWidths={columnWidths}
        url={url}
        createFormInitialValues={createFormInitialValues}
        readFields={readFields}
        editFields={editFields}
        roles={roles}
      />
    </>
  );
};

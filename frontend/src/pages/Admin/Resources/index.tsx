import React, { FC, useEffect } from "react";
import { editFields, readFields } from "./fields";
import { TableComplete } from "components/TableComplete";
import useTitle from "hooks/useTitle";

export const Resources: FC = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Resources");
  }, [updateTitle]);

  const createFormInitialValues = {
    resource_last_name: "",
    resource_first_name: "",
    resource_id: 0,
  };

  const roles = {
    get: "admin_form_read_all",
    add: "admin_form_add_one",
    update: "admin_form_update_one",
    delete: "admin_form_delete_one",
  };

  const url = {
    getAll: `/resources`,
    getOne: `/resources/{id}`,
    updateOne: `/resources/{id}`,
    addOne: `/resources`,
  };

  return (
    <TableComplete
      itemName="Resource"
      tableName="resources"
      url={url}
      createFormInitialValues={createFormInitialValues}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};

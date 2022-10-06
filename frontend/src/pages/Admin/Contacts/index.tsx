import React, { FC } from "react";
import { editFields, readFields } from "./fields";
import { TableComplete } from "components/TableComplete";

export const Contacts: FC = () => {
  const createFormInitialValues = {
    first_name: "",
    address: "",
    last_name: "",
    city: "",
    contact_title: "",
    province: "",
    ministry_id: {
      value: 0,
      label: "",
    },
    country: "",
    contact_phone: "",
    postal: "",
    mobile: "",
    website: "",
    email: "",
    notes: "",
  };

  const roles = {
    get: "admin_form_read_all",
    add: "admin_form_add_one",
    update: "admin_form_update_one",
    delete: "admin_form_delete_one",
  };

  const url = {
    getAll: `/contacts`,
    getOne: `/contacts/{id}`,
    updateOne: `/contacts/{id}`,
    addOne: `/contacts`,
  };
  const columnWidths = {
    job_title: 2,
    notes: 3,
  };

  return (
    <TableComplete
      itemName="Contacts"
      tableName="contact"
      columnWidths={columnWidths}
      url={url}
      createFormInitialValues={createFormInitialValues}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};

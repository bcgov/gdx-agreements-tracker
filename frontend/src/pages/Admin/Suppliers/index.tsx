import React, { FC } from "react";
import { readFields, editFields } from "./fields";
import { TableComplete } from "components/TableComplete";
/**
 * The suppliers page
 *
 * @returns {JSX.Element} Suppliers
 */

export const Suppliers: FC = (): JSX.Element => {
  const createFormInitialValues = {
    supplier_number: 0,
    site_number: "",
    supplier_name: "",
    signing_authority_name: "",
    signing_authority_title: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postal_code: "",
    phone: "",
    fax: "",
    email: "",
    website: "",
    financial_contact_name: "",
    financial_contact_phone: "",
    financial_contact_email: "",
    supplier_legal_name: "",
  };

  const roles = {
    get: "admin_form_read_all",
    add: "admin_form_add_one",
    update: "admin_form_update_one",
    delete: "admin_form_delete_one",
  };

  const url = {
    getAll: `/suppliers`,
    getOne: `/suppliers/{id}`,
    updateOne: `/suppliers/{id}`,
    addOne: `/suppliers`,
  };

  return (
    <TableComplete
      itemName="Supplier"
      tableName="suppliers"
      url={url}
      createFormInitialValues={createFormInitialValues}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};

const AllCapabilities = [
  "resources_read_all",
  "resources_read_mine",
  "resources_update_all",
  "resources_update_mine",
  "resources_add_one",
  "change_request_read_all",
  "change_request_read_mine",
  "report_read_mine",
  "change_request_update_one",
  "change_request_update_all",
  "change_request_add_one",
  "contracts_read_mine",
  "contracts_read_all",
  "project_status_read_all",
  "project_status_read_mine",
  "suppliers_update_all",
  "suppliers_read_all",
  "suppliers_update_mine",
  "subcontractors_read_all",
  "subcontractors_read_mine",
  "subcontractors_update_all",
  "subcontractors_update_mine",
  "subcontractors_add_one",
  "ministries_read_all",
  "ministries_read_mine",
  "ministries_update_all",
  "ministries_update_mine",
  "ministries_add_one",
  "supplier_add_one",
  "amendments_read_all",
  "amendments_read_mine",
  "contracts_update_all",
];

const capabilities = [
  {
    capability: "users_create_all",
    allowed: ["admin"],
  },
  {
    capability: "users_read_all",
    allowed: ["admin"],
  },
  {
    capability: "users_update_all",
    allowed: ["admin"],
  },
  {
    capability: "users_delete_all",
    allowed: ["admin"],
  },
  {
    capability: "admin_form_read_all",
    allowed: ["admin", "manager"],
  },
  {
    capability: "admin_form_update_all",
    allowed: ["admin"],
  },
  {
    capability: "contacts_read_all",
    allowed: ["admin", "manager"],
  },
  {
    capability: "contacts_add_one",
    allowed: ["admin", "manager"],
  },
  {
    capability: "contacts_update_all",
    allowed: ["admin"],
  },
  {
    capability: "projects_read_all",
    allowed: ["admin", "manager"],
  },
  {
    capability: "projects_update_mine",
    allowed: ["admin", "manager"],
  },
  {
    capability: "projects_update_all",
    allowed: ["admin"],
  },
  {
    capability: "picker_options_read_all",
    allowed: ["admin", "manager", "gdx", "subscriber"],
  },
  {
    capability: "general_read_all",
    allowed: ["admin", "manager", "gdx", "subscriber"],
  },
  {
    capability: "general_read_mine",
    allowed: ["admin", "manager", "gdx", "subscriber"],
  },
];

/**
 * Gets all the capabilities for one of the following roles (admin|manager|subscriber|gdx)
 *
 * @param   {string} role The role to get permissions for.
 * @returns {Array}
 */
const getCapabilities = (role) => {
  let roleCapability = [];
  capabilities.forEach((cap) => {
    if (cap.capability && cap.allowed.includes(role) && !roleCapability.includes(cap.capability)) {
      roleCapability.push(cap.capability);
    }
  });
  if ("admin" === role) {
    roleCapability = roleCapability.concat(AllCapabilities);
  }
  return roleCapability.sort();
};

module.exports = {
  getCapabilities,
};

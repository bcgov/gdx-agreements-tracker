const capabilities = [
  {
    capability: "admin_form_add_one",
    allowed: ["admin"],
  },
  {
    capability: "admin_form_read_all",
    allowed: ["admin", "manager"],
  },
  {
    capability: "admin_form_create_one",
    allowed: ["admin"],
  },
  {
    capability: "admin_form_update_one",
    allowed: ["admin"],
  },
  {
    capability: "admin_form_delete_one",
    allowed: ["admin"],
  },
  {
    capability: "contracts_read_all",
    allowed: ["admin", "manager"],
  },
  {
    capability: "contracts_add_one",
    allowed: ["admin"],
  },
  {
    capability: "contracts_update_one",
    allowed: ["admin"],
  },
  {
    capability: "contracts_delete_one",
    allowed: ["admin"],
  },
  {
    capability: "projects_read_all",
    allowed: ["admin", "manager"],
  },
  {
    capability: "projects_add_one",
    allowed: ["admin"],
  },
  {
    capability: "projects_update_one",
    allowed: ["admin"],
  },
  {
    capability: "projects_delete_one",
    allowed: ["admin"],
  },
  {
    capability: "project_lessons_add_one",
    allowed: ["admin", "manager"],
  },
  {
    capability: "project_statuses_add_one",
    allowed: ["admin", "manager"],
  },
  {
    capability: "reports_read_all",
    allowed: ["admin", "manager", "gdx"],
  },
  {
    capability: "reports_create_one",
    allowed: ["admin"],
  },
  {
    capability: "reports_update_one",
    allowed: ["admin"],
  },
  {
    capability: "reports_delete_one",
    allowed: ["admin"],
  },
  {
    capability: "users_read_all",
    allowed: ["admin"],
  },
  {
    capability: "users_add_one",
    allowed: ["admin"],
  },
  {
    capability: "users_update_one",
    allowed: ["admin"],
  },
  {
    capability: "users_delete_one",
    allowed: ["admin"],
  },
  {
    capability: "general_read_all",
    allowed: ["admin", "manager", "gdx", "subscriber"],
  },
  {
    capability: "db_lock_add_one",
    allowed: ["admin", "manager", "gdx", "subscriber"],
  },
  {
    capability: "db_lock_read_all",
    allowed: ["admin", "manager", "gdx", "subscriber"],
  },
  {
    capability: "db_lock_delete_one",
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
  const roleCapability = [];
  capabilities.forEach((cap) => {
    if (cap.capability && cap.allowed.includes(role) && !roleCapability.includes(cap.capability)) {
      roleCapability.push(cap.capability);
    }
  });
  return roleCapability.sort();
};

module.exports = {
  getCapabilities,
};

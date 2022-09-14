/**
 * Yes no options.
 */
const yesNoOptions = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
  {
    value: "N/A",
    label: "N/A",
  },
  {
    value: null,
    label: "",
  },
];

/**
 * Project classifications type for a project.
 */
const classification = [
  {
    value: "Strategic",
    label: "Strategic",
  },
  {
    value: "Innovation",
    label: "Innovation",
  },
  {
    value: "Tactical",
    label: "Tactical",
  },
  {
    value: "Maintenance/Sustainment",
    label: "Maintenance/Sustainment",
  },
  {
    value: "Operational",
    label: "Operational",
  },
  {
    value: "Infrastructure",
    label: "Infrastructure",
  },
  {
    value: "Support for Strategic or Business Planning",
    label: "Support for Strategic or Business Planning",
  },
  {
    value: "Transformation",
    label: "Transformation",
  },
];

/**
 * The agreement type for a project.
 */
const agreementType = [
  {
    value: "Project Charter",
    label: "Project Charter",
  },
  {
    value: "Other",
    label: "Other",
  },
  {
    value: "Partnership Agreement",
    label: "Partnership Agreement",
  },
  {
    value: "MOU",
    label: "MOU",
  },
];

/**
 * The project status.
 */
const projectStatus = [
  {
    value: "NewRequest",
    label: "New Request",
  },
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Cancelled",
    label: "Cancelled",
  },
  {
    value: "Complete",
    label: "Complete",
  },
];

/**
 * The project type.
 */
const projectType = [
  {
    value: "External",
    label: "External",
  },
  {
    value: "Internal",
    label: "Internal",
  },
];

/**
 * Project funding.
 */
const projectFunding = [
  {
    value: "Operational",
    label: "Operational",
  },
  {
    value: "Capital",
    label: "Capital",
  },
  {
    value: "Combination",
    label: "Combination",
  },
];

/**
 * Project recoverable.
 */
const projectRecoverable = [
  {
    value: "Fully",
    label: "Fully",
  },
  {
    value: "Partially",
    label: "Partially",
  },
  {
    value: "Non-Recoverable",
    label: "Non-Recoverable",
  },
];

/**
 * Initiated by.
 */
const initiatedBy = [
  {
    value: "GDX",
    label: "GDX",
  },
  {
    value: "Client",
    label: "Client",
  },
];

module.exports = {
  yesNoOptions,
  classification,
  agreementType,
  projectStatus,
  projectType,
  projectFunding,
  projectRecoverable,
  initiatedBy,
};

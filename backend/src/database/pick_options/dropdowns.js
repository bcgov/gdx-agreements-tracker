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
 * Yes no options.
 */
const quarter = [
  {
    value: "1",
    label: "Q1",
  },
  {
    value: "2",
    label: "Q2",
  },
  {
    value: "3",
    label: "Q3",
  },
  {
    value: "4",
    label: "Q4",
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
 * The billing period (month) of an invoice.
 */
const billingPeriod = [
  {
    value: "Jan",
    label: "January",
  },
  {
    value: "Feb",
    label: "February",
  },
  {
    value: "Mar",
    label: "March",
  },
  {
    value: "Apr",
    label: "April",
  },
  {
    value: "May",
    label: "May",
  },
  {
    value: "Jun",
    label: "June",
  },
  {
    value: "Jul",
    label: "July",
  },
  {
    value: "Aug",
    label: "August",
  },
  {
    value: "Sep",
    label: "September",
  },
  {
    value: "Oct",
    label: "October",
  },
  {
    value: "Nov",
    label: "November",
  },
  {
    value: "Dec",
    label: "December",
  },
];

/**
 * The contract status.
 */
const contractStatus = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Draft",
    label: "Draft",
  },
  {
    value: "Sent",
    label: "Sent",
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
 * The contract type.
 */
const contractType = [
  {
    value: "ChangeOrder",
    label: "Change Order",
  },
  {
    value: "General Service Agreement",
    label: "General Service Agreement",
  },
  {
    value: "IT General Service Agreement",
    label: "IT General Service Agreement",
  },
  {
    value: "StandingOffer",
    label: "Standing Offer",
  },
  {
    value: "Agile Service Agreement",
    label: "Agile Service Agreement",
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

const deliverable_status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Complete",
    label: "Complete",
  },
];

const resourceType = [
  {
    value: "Staff",
    label: "Staff",
  },
  {
    value: "Contract",
    label: "Contract",
  },
];

module.exports = {
  yesNoOptions,
  classification,
  agreementType,
  billingPeriod,
  contractStatus,
  contractType,
  projectStatus,
  projectType,
  projectFunding,
  projectRecoverable,
  initiatedBy,
  deliverable_status,
  quarter,
  resourceType,
};

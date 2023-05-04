const {
  getProjectById,
  projectStatusReport,
  getMilestones,
  getStrategicAlignment,
  getProjectStatuses,
  getLessonsLearned,
} = require("@models/reports/useProject");
const { findById, findMostRecentStatusById } = require("@models/projects");

module.exports = {
  findById,
  findMostRecentStatusById,
  getProjectById,
  projectStatusReport,
  getMilestones,
  getStrategicAlignment,
  getProjectStatuses,
  getLessonsLearned,
};

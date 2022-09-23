const { Schema, getResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const yesNoEnum = ["Yes", "No", "N/A", null];

const requestSingleBody = S.object()
  // Registration
  .prop("project_number", Schema.ShortString.minLength(1))
  .prop("project_name", Schema.ShortString.minLength(1))
  .prop("project_version", Schema.ShortString)
  .prop("ministry_id", Schema.Id)
  .prop("initiation_date", Schema.Date)
  .prop("portfolio_id", Schema.Id)
  .prop("planned_start_date", Schema.Date)
  .prop("fiscal", Schema.Id)
  .prop("planned_end_date", Schema.Date)
  .prop("planned_budget", Schema.Money)
  .prop("project_type", Schema.Enum(["Internal", "External", null]))
  .prop("project_status", Schema.Enum(["NewRequest", "Active", "Cancelled", "Complete", null]))
  .prop("funding", Schema.Enum(["Operational", "Capital", "Combination", null]))
  .prop("total_project_budget", Schema.Money)
  .prop("recoverable", Schema.Enum(["Fully", "Partially", "Non-Recoverable", null]))
  .prop("recoverable_amount", Schema.Money)
  // Agreement
  .prop(
    "agreement_type",
    Schema.Enum(["Project Charter", "Other", "Partnership Agreement", "MOU", null])
  )
  .prop("agreement_start_date", Schema.Date)
  .prop("agreement_signed_date", Schema.Date)
  .prop("agreement_end_date", Schema.Date)
  .prop("description", S.string())
  .prop("notes", S.string())
  // Close Out
  .prop("close_out_date", Schema.Date)
  .prop("completed_by_contact_id", Schema.Id)
  .prop("actual_completion_date", Schema.Date)
  .prop("hand_off_to_operations", Schema.Enum(yesNoEnum))
  .prop("records_filed", Schema.Enum(yesNoEnum))
  .prop("contract_ev_completed", Schema.Enum(yesNoEnum))
  .prop("contractor_security_terminated", Schema.Enum(yesNoEnum));

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", Schema.Id)
        .prop("project_number", Schema.ShortString)
        .prop("project_name", Schema.ShortString)
        .prop("project_version", Schema.ShortString)
        .prop("portfolio_id", Schema.Id)
        .prop("project_manager", Schema.Id)
        .prop("agreement_end_date", Schema.Date)
        .prop("project_status", Schema.ShortString)
        .prop("initiation_date", Schema.Date)
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("project_number", Schema.ShortString)
      .prop("project_name", Schema.ShortString)
      .prop("project_version", Schema.ShortString)
      .prop("ministry_id", Schema.Picker)
      .prop("initiation_date", Schema.Date)
      .prop("portfolio_id", Schema.Picker)
      .prop("planned_start_date", Schema.Date)
      .prop("fiscal", Schema.Picker)
      .prop("planned_end_date", Schema.Date)
      .prop("planned_budget", Schema.Money)
      .prop("project_type", Schema.Picker)
      .prop("project_status", Schema.Picker)
      .prop("funding", Schema.Picker)
      .prop("total_project_budget", Schema.Money)
      .prop("recoverable", Schema.Picker)
      .prop("recoverable_amount", Schema.Money)
      .prop("agreement_type", Schema.Picker)
      .prop("agreement_start_date", Schema.Date)
      .prop("agreement_signed_date", Schema.Date)
      .prop("agreement_end_date", Schema.Date)
      .prop("description", S.string())
      .prop("notes", S.string())
      .prop(
        "contracts",
        S.array().items(S.object().prop("id", Schema.Id).prop("co_number", Schema.ShortString))
      )
  ),
};

const getOneCloseOut = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("close_out_date", Schema.Date)
      .prop("completed_by_contact_id", Schema.Picker)
      .prop("actual_completion_date", Schema.Date)
      .prop("hand_off_to_operations", Schema.Picker)
      .prop("records_filed", Schema.Picker)
      .prop("contract_ev_completed", Schema.Picker)
      .prop("contractor_security_terminated", Schema.Picker)
  ),
};

const updateOne = {
  params: Schema.IdParam,
  body: requestSingleBody.minProperties(1),
  response: getUpdateResponse(),
};

const getLessonsLearnedById = {
  params: Schema.IdParam.prop("lessonsLearnedtId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("lesson_category_id", Schema.Picker)
      .prop("lesson_sub_category", S.string())
      .prop("lesson", S.string())
      .prop("recommendations", S.string())
      .prop("id", Schema.Id)
  ),
};

const getAllLessonsLearned = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("category", S.string())
        .prop("lesson_sub_category", S.string())
        .prop("lesson", S.string())
        .prop("recommendations", S.string())
        .prop("id", Schema.Id)
    )
  ),
};

module.exports = {
  getAll,
  getOne,
  getOneCloseOut,
  updateOne,
  getLessonsLearnedById,
  getAllLessonsLearned,
};

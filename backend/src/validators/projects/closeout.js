const { Schema, getResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getOneById = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("close_out_date", S.string())
      .prop("completed_by_contact_id", Schema.Picker)
      .prop("actual_completion_date", S.string())
      .prop("hand_off_to_operations", Schema.Picker)
      .prop("records_filed", Schema.Picker)
      .prop("contract_ev_completed", Schema.Picker)
      .prop("contractor_security_terminated", Schema.Picker)
  ),
};

const updateOne = {
  params: Schema.IdParam,
  body: S.object()
    .prop("actual_completion_date", Schema.Date)
    .prop("close_out_date", Schema.Date)
    .prop("completed_by_contact_id", Schema.Id)
    .prop("contract_ev_completed", S.string())
    .prop("contractor_security_terminated", S.string())
    .prop("hand_off_to_operations", S.string())
    .prop("records_filed", S.string()),
};

module.exports = {
  getOneById,
  updateOne,
};

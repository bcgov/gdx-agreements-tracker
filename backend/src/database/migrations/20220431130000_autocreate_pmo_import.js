exports.up = function (knex) {
  return knex.raw("CREATE SCHEMA IF NOT EXISTS data").then(function () {
    return knex.schema
      .withSchema("data")
      .createTable("amendment_type", function (table) {
        table.increments();
        table.specificType("amendment_type_name", "varchar(50)").notNullable();
        table.specificType("inactive", "boolean").notNullable();
      })
      .createTable("audit_contract", function (table) {
        table.increments();
        table.specificType("audit_type", "varchar(8)");
        table.specificType("audit_date", "timestamp");
        table.specificType("audit_user", "varchar(40)");
        table.specificType("contract_id", "int");
        table.specificType("co_number", "varchar(255)").notNullable();
        table.specificType("co_version", "varchar(255)");
        table.specificType("project_id", "int");
        table.specificType("total_fee_amount", "money");
        table.specificType("total_expense_amount", "money");
        table.specificType("start_date", "timestamp");
        table.specificType("end_date", "timestamp");
        table.specificType("status", "varchar(255)");
        table.specificType("fiscal", "varchar(255)");
        table.specificType("contract_number", "varchar(255)");
        table.specificType("contract_type", "varchar(255)");
        table.specificType("supplier_id", "int");
        table.specificType("requisition_number", "varchar(255)");
        table.specificType("procurement_method_id", "int");
        table.specificType("procurement_method_other", "varchar(255)");
        table.specificType("description", "text");
        table.specificType("notes", "varchar(255)");
        table.specificType("recoverable", "boolean");
        table.specificType("portfolio_id", "int");
        table.specificType("hours", "varchar(255)");
        table.specificType("sid_internal_coding", "varchar(255)");
        table.specificType("sid_qualified_receiver", "varchar(255)");
        table.specificType("wip", "varchar(255)");
      })
      .createTable("audit_project", function (table) {
        table.increments();
        table.specificType("audit_type", "varchar(8)");
        table.specificType("audit_date", "timestamp");
        table.specificType("audit_user", "varchar(40)");
        table.specificType("project_id", "int");
        table.specificType("fiscal", "varchar(255)");
        table.specificType("project_number", "varchar(255)").notNullable();
        table.specificType("project_version", "varchar(255)");
        table.specificType("project_name", "varchar(255)").notNullable();
        table.specificType("project_manager", "int");
        table.specificType("portfolio_id", "int");
        table.specificType("classification", "varchar(255)");
        table.specificType("project_type", "varchar(255)");
        table.specificType("funding", "varchar(255)");
        table.specificType("recoverable", "varchar(255)");
        table.specificType("ministry_id", "int");
        table.specificType("agreement_type", "varchar(255)");
        table.specificType("agreement_start_date", "timestamp");
        table.specificType("agreement_end_date", "timestamp");
        table.specificType("total_project_budget", "money");
        table.specificType("recoverable_amount", "money");
        table.specificType("description", "text");
        table.specificType("initiation_date", "timestamp");
        table.specificType("lead", "varchar(255)");
        table.specificType("notes", "text");
        table.specificType("project_status", "varchar(255)");
        table.specificType("planned_start_date", "timestamp");
        table.specificType("planned_end_date", "timestamp");
        table.specificType("planned_budget", "money");
        table.specificType("agreement_signed_date", "timestamp");
        table.specificType("situation_rationale", "text");
        table.specificType("project_goals", "text");
        table.specificType("out_of_scope", "varchar(255)");
        table.specificType("functional_changes_required", "varchar(255)");
        table.specificType("has_public_data", "varchar(255)");
        table.specificType("strategic_alignments_added", "boolean");
        table.specificType("close_out_date", "timestamp");
        table.specificType("completed_by_contact_id", "int");
        table.specificType("actual_completion_date", "timestamp");
        table.specificType("hand_off_to_operations", "varchar(255)");
        table.specificType("records_filed", "varchar(255)");
        table.specificType("contract_ev_completed", "varchar(255)");
        table.specificType("contractor_security_terminated", "varchar(255)");
      })
      .createTable("audit_project_budget", function (table) {
        table.increments();
        table.specificType("audit_type", "varchar(8)");
        table.specificType("audit_date", "timestamp");
        table.specificType("audit_user", "varchar(40)");
        table.specificType("project_budget_id", "int");
        table.specificType("q1_amount", "money");
        table.specificType("q1_recovered", "boolean");
        table.specificType("q2_amount", "money");
        table.specificType("q2_recovered", "boolean");
        table.specificType("q3_amount", "money");
        table.specificType("q3_recovered", "boolean");
        table.specificType("q4_amount", "money");
        table.specificType("q4_recovered", "boolean");
        table.specificType("fiscal", "varchar(255)");
        table.specificType("notes", "varchar(255)");
        table.specificType("project_deliverable_id", "int");
        table.specificType("detail_amount", "money");
        table.specificType("recovery_amount", "money");
        table.specificType("recovery_area", "int");
        table.specificType("resource_type", "varchar(255)");
        table.specificType("stob", "varchar(255)");
        table.specificType("recovered", "boolean");
        table.specificType("client_coding_id", "int");
        table.specificType("contract_id", "int");
      })
      .createTable("audit_project_deliverable", function (table) {
        table.increments();
        table.specificType("audit_type", "varchar(8)");
        table.specificType("audit_date", "timestamp");
        table.specificType("audit_user", "varchar(40)");
        table.specificType("project_deliverable_id", "int");
        table.specificType("deliverable_name", "varchar(255)");
        table.specificType("description", "text");
        table.specificType("start_date", "timestamp");
        table.specificType("completion_date", "timestamp");
        table.specificType("deliverable_amount", "money");
        table.specificType("recoverable_amount", "money");
        table.specificType("project_id", "int");
        table.specificType("comments", "text");
        table.specificType("fiscal", "varchar(255)");
        table.specificType("deliverable_status", "varchar(255)");
        table.specificType("percent_complete", "double precision");
        table.specificType("health_id", "int");
        table.specificType("is_expense", "boolean");
      })
      .createTable("change_request", function (table) {
        table.increments();
        table.specificType("version", "varchar(255)");
        table.specificType("initiation_date", "timestamp");
        table.specificType("cr_contact", "varchar(255)");
        table.specificType("initiated_by", "varchar(255)");
        table.specificType("fiscal_year", "int");
        table.specificType("summary", "text");
        table.specificType("approval_date", "timestamp");
        table.specificType("link_id", "int");
      })
      .createTable("change_request_crtype", function (table) {
        table.increments();
        table.specificType("change_request_id", "int").notNullable();
        table.specificType("crtype_id", "int").notNullable();
      })
      .createTable("client_coding", function (table) {
        table.increments();
        table.specificType("project_id", "int");
        table.specificType("client", "varchar(255)");
        table.specificType("responsibility_centre", "varchar(255)");
        table.specificType("service_line", "varchar(255)");
        table.specificType("stob", "varchar(255)");
        table.specificType("project_code", "varchar(255)");
        table.specificType("contact_id", "int");
        table.specificType("client_amount", "money");
        table.specificType("program_area", "varchar(255)");
        table.specificType("expense_authority_name", "varchar(255)");
      })
      .createTable("contact", function (table) {
        table.increments();
        table.specificType("last_name", "varchar(255)").notNullable();
        table.specificType("first_name", "varchar(255)").notNullable();
        table.specificType("email", "varchar(255)");
        table.specificType("contact_phone", "varchar(255)");
        table.specificType("contact_title", "varchar(255)");
        table.specificType("ministry_id", "int");
        table.specificType("business_area_id", "int");
        table.specificType("address", "varchar(255)");
        table.specificType("city", "varchar(255)");
        table.specificType("province", "varchar(255)");
        table.specificType("postal", "varchar(255)");
        table.specificType("country", "varchar(255)");
        table.specificType("website", "varchar(255)");
        table.specificType("mobile", "varchar(255)");
        table.specificType("fax", "varchar(255)");
        table.specificType("notes", "text");
      })
      .createTable("contact_project", function (table) {
        table.increments();
        table.specificType("contact_id", "int").notNullable();
        table.specificType("project_id", "int").notNullable();
        table.specificType("contact_role", "int");
      })
      .createTable("contact_role", function (table) {
        table.increments();
        table.specificType("role_type", "varchar(255)");
      })
      .createTable("contract", function (table) {
        table.increments();
        table.specificType("co_number", "varchar(255)").notNullable();
        table.specificType("co_version", "varchar(10)");
        table.specificType("project_id", "int");
        table.specificType("total_fee_amount", "money").notNullable();
        table.specificType("total_expense_amount", "money").notNullable();
        table.specificType("start_date", "timestamp").notNullable();
        table.specificType("end_date", "timestamp").notNullable();
        table.specificType("status", "varchar(255)").notNullable();
        table.specificType("fiscal", "int").notNullable();
        table.specificType("contract_number", "varchar(255)");
        table.specificType("contract_type", "varchar(255)").notNullable();
        table.specificType("supplier_id", "int").notNullable();
        table.specificType("requisition_number", "varchar(255)");
        table.specificType("procurement_method_id", "int");
        table.specificType("procurement_method_other", "varchar(255)");
        table.specificType("description", "varchar(100)");
        table.specificType("notes", "text");
        table.specificType("recoverable", "boolean");
        table.specificType("hours", "varchar(255)");
        table.specificType("portfolio_id", "int");
        table.specificType("sid_internal_coding", "varchar(255)");
        table.specificType("sid_qualified_receiver", "varchar(255)");
        table.specificType("wip", "varchar(255)");
      })
      .createTable("contract_resource", function (table) {
        table.increments();
        table.specificType("contract_id", "int").notNullable();
        table.specificType("resource_id", "int").notNullable();
        table.specificType("supplier_rate_id", "int").notNullable();
        table.specificType("assignment_rate", "money").notNullable();
        table.specificType("hours", "double precision");
        table.specificType("start_date", "timestamp");
        table.specificType("end_date", "timestamp");
        table.specificType("fiscal", "int").notNullable();
      })
      .createTable("contract_amendment", function (table) {
        table.increments();
        table.specificType("contract_id", "int").notNullable();
        table.specificType("amendment_number", "int").notNullable();
        table.specificType("amendment_date", "timestamp").notNullable();
        table.specificType("description", "text");
      })
      .createTable("contract_amendment_amendment_type", function (table) {
        table.increments();
        table.specificType("contract_amendment_id", "int").notNullable();
        table.specificType("amendment_type_id", "int").notNullable();
      })
      .createTable("contract_deliverable", function (table) {
        table.increments();
        table.specificType("contract_id", "int");
        table.specificType("deliverable_name", "varchar(255)").notNullable();
        table.specificType("description", "text");
        table.specificType("is_expense", "boolean");
        table.specificType("completion_date", "timestamp");
        table.specificType("deliverable_amount", "money");
        table.specificType("deliverable_status", "varchar(255)").notNullable();
        table.specificType("project_deliverable_id", "int");
        table.specificType("comments", "text");
        table.specificType("fiscal", "int").notNullable();
      })
      .createTable("contract_subcontractor", function (table) {
        table.increments();
        table.specificType("contract_id", "int").notNullable();
        table.specificType("subcontractor_id", "int").notNullable();
      })
      .createTable("crtype", function (table) {
        table.increments();
        table.specificType("crtype_name", "varchar(50)").notNullable();
        table.specificType("inactive", "boolean").notNullable();
      })
      .createTable("division", function (table) {
        table.increments();
        table.specificType("division_name", "varchar(50)").notNullable();
        table.specificType("division_abbreviation", "varchar(10)").notNullable();
        table.specificType("inactive", "boolean").notNullable();
      })
      .createTable("engagement_checklist_item", function (table) {
        table.increments();
        table.specificType("description", "text").notNullable();
        table.specificType("short_description", "text");
        table.specificType("sort_order", "double precision");
        table.specificType("inactive", "boolean").notNullable();
      })
      .createTable("engagement_phase", function (table) {
        table.increments();
        table.specificType("description", "varchar(50)").notNullable();
        table.specificType("sort_order_forms", "double precision");
        table.specificType("sort_order_reports", "double precision");
        table.specificType("exclude_from_reports", "boolean").notNullable();
        table.specificType("inactive", "boolean").notNullable();
      })
      .createTable("fiscal_year", function (table) {
        table.increments();
        table.specificType("fiscal_year", "varchar(255)").notNullable();
        table.specificType("is_current", "boolean");
      })
      .createTable("health_indicator", function (table) {
        table.increments();
        table.specificType("health_name", "varchar(20)").notNullable();
        table.specificType("colour_red", "smallint").notNullable();
        table.specificType("colour_green", "smallint").notNullable();
        table.specificType("colour_blue", "smallint").notNullable();
        table.specificType("sort_order", "double precision");
        table.specificType("inactive", "boolean");
      })
      .createTable("historical_contract_assignments", function (table) {
        table.increments();
        table.specificType("co_number", "varchar(255)").notNullable();
        table.specificType("resource_id", "int").notNullable();
        table.specificType("resource_type_id", "int").notNullable();
        table.specificType("assignment_rate", "money");
      })
      .createTable("historical_contracts", function (table) {
        table.increments();
        table.specificType("co_number", "varchar(255)").notNullable();
        table.specificType("amendment_count", "int").notNullable();
        table.specificType("fiscal_year", "int");
        table.specificType("supplier_id", "int").notNullable();
        table.specificType("subcontractor_id", "int");
        table.specificType("portfolio_id", "int");
        table.specificType("project_number", "varchar(255)");
        table.specificType("start_date", "timestamp").notNullable();
        table.specificType("end_date", "timestamp").notNullable();
        table.specificType("total_contract_amount", "money").notNullable();
        table.specificType("invoiced", "money").notNullable();
        table.specificType("procurement_method", "varchar(255)").notNullable();
      })
      .createTable("historical_office_data", function (table) {
        table.increments();
        table.specificType("fiscal_year", "int").notNullable();
        table.specificType("pmo_staff", "real");
        table.specificType("division_fte", "real");
        table.specificType("salaries_and_benefits", "money");
        table.specificType("operating_costs", "money");
        table.specificType("target_recoveries", "money");
        table.specificType("recoveries", "money");
        table.specificType("unique_clients", "int");
        table.specificType("notes", "text");
      })
      .createTable("historical_project_billing", function (table) {
        table.increments();
        table.specificType("project_number", "varchar(255)").notNullable();
        table.specificType("fiscal_year", "int").notNullable();
        table.specificType("q1", "money");
        table.specificType("q2", "money");
        table.specificType("q3", "money");
        table.specificType("q4", "money");
      })
      .createTable("historical_projects", function (table) {
        table.increments();
        table.specificType("project_number", "varchar(255)").notNullable();
        table.specificType("change_request_count", "int").notNullable();
        table.specificType("fiscal_year", "int").notNullable();
        table.specificType("registration_date", "timestamp").notNullable();
        table.specificType("project_name", "varchar(255)").notNullable();
        table.specificType("project_manager", "varchar(255)");
        table.specificType("portfolio_id", "int").notNullable();
        table.specificType("project_type", "varchar(255)").notNullable();
        table.specificType("ministry_id", "int");
        table.specificType("description", "text");
        table.specificType("start_date", "timestamp").notNullable();
        table.specificType("end_date", "timestamp").notNullable();
        table.specificType("total_project_budget", "money");
      })
      .createTable("invoice", function (table) {
        table.increments();
        table.specificType("contract_id", "int").notNullable();
        table.specificType("received_date", "timestamp").notNullable();
        table.specificType("invoice_date", "timestamp");
        table.specificType("due_date", "timestamp");
        table.specificType("billing_period", "varchar(255)");
        table.specificType("invoice_number", "varchar(255)");
        table.specificType("notes", "text");
        table.specificType("fiscal", "int").notNullable();
        table.specificType("is_gl", "boolean").notNullable();
      })
      .createTable("invoice_detail", function (table) {
        table.increments();
        table.specificType("invoice_id", "int");
        table.specificType("contract_resource_id", "int");
        table.specificType("contract_deliverable_id", "int");
        table.specificType("unit_amount", "double precision").notNullable();
        table.specificType("rate", "money");
        table.specificType("notes", "text");
      })
      .createTable("jv", function (table) {
        table.increments();
        table.specificType("jv_number", "varchar(255)").notNullable();
        table.specificType("billed_date", "timestamp");
        table.specificType("amount", "money").notNullable();
        table.specificType("quarter", "varchar(255)");
        table.specificType("project_id", "int");
        table.specificType("fiscal_year_id", "int");
        table.specificType("client_coding_id", "int");
      })
      .createTable("jv_detail", function (table) {
        table.increments();
        table.specificType("jv_id", "int");
        table.specificType("amount", "money");
        table.specificType("deliverable_id", "int");
      })
      .createTable("lesson_category", function (table) {
        table.increments();
        table.specificType("lesson_category_name", "varchar(255)").notNullable();
        table.specificType("inactive", "boolean");
      })
      .createTable("ministry", function (table) {
        table.increments();
        table.specificType("ministry_name", "varchar(255)").notNullable();
        table.specificType("ministry_short_name", "varchar(255)").notNullable();
        table.specificType("is_active", "boolean");
      })
      .createTable("next_available_number", function (table) {
        table.increments();
        table.specificType("code_desc", "varchar(255)").notNullable();
        table.specificType("prefix", "varchar(255)");
        table.specificType("last_number", "int");
      })
      .createTable("portfolio", function (table) {
        table.increments();
        table.specificType("portfolio_name", "varchar(255)");
        table.specificType("expense_authority", "varchar(255)");
        table.specificType("responsibility", "varchar(255)");
        table.specificType("service_line", "varchar(255)");
        table.specificType("portfolio_abbrev", "varchar(10)");
        table.specificType("division_id", "int").notNullable();
        table.specificType("inactive", "boolean").notNullable();
        table.specificType("client", "varchar(255)");
        table.specificType("cas_project_code", "varchar(255)");
      })
      .createTable("procurement_method", function (table) {
        table.increments();
        table.specificType("procurement_method_code", "varchar(10)").notNullable();
        table.specificType("procurement_method", "varchar(255)");
      })
      .createTable("project", function (table) {
        table.increments();
        table.specificType("fiscal", "int");
        table.specificType("project_number", "varchar(255)").notNullable();
        table.specificType("project_version", "varchar(255)");
        table.specificType("project_name", "varchar(255)").notNullable();
        table.specificType("project_manager", "int");
        table.specificType("portfolio_id", "int");
        table.specificType("classification", "varchar(255)");
        table.specificType("project_type", "varchar(255)");
        table.specificType("funding", "varchar(255)");
        table.specificType("recoverable", "varchar(255)");
        table.specificType("ministry_id", "int");
        table.specificType("agreement_type", "varchar(255)");
        table.specificType("agreement_start_date", "timestamp");
        table.specificType("agreement_end_date", "timestamp");
        table.specificType("total_project_budget", "money");
        table.specificType("recoverable_amount", "money");
        table.specificType("description", "text");
        table.specificType("initiation_date", "timestamp");
        table.specificType("lead", "varchar(255)");
        table.specificType("notes", "text");
        table.specificType("project_status", "varchar(255)");
        table.specificType("planned_start_date", "timestamp");
        table.specificType("planned_end_date", "timestamp");
        table.specificType("planned_budget", "money");
        table.specificType("agreement_signed_date", "timestamp");
        table.specificType("situation_rationale", "text");
        table.specificType("project_goals", "text");
        table.specificType("out_of_scope", "varchar(255)");
        table.specificType("functional_changes_required", "varchar(255)");
        table.specificType("has_public_data", "varchar(255)");
        table.specificType("strategic_alignments_added", "boolean");
        table.specificType("close_out_date", "timestamp");
        table.specificType("completed_by_contact_id", "int");
        table.specificType("actual_completion_date", "timestamp");
        table.specificType("hand_off_to_operations", "varchar(255)");
        table.specificType("records_filed", "varchar(255)");
        table.specificType("contract_ev_completed", "varchar(255)");
        table.specificType("contractor_security_terminated", "varchar(255)");
      })
      .createTable("project_budget", function (table) {
        table.increments();
        table.specificType("q1_amount", "money");
        table.specificType("q1_recovered", "boolean");
        table.specificType("q2_amount", "money");
        table.specificType("q2_recovered", "boolean");
        table.specificType("q3_amount", "money");
        table.specificType("q3_recovered", "boolean");
        table.specificType("q4_amount", "money");
        table.specificType("q4_recovered", "boolean");
        table.specificType("fiscal", "int");
        table.specificType("notes", "varchar(255)");
        table.specificType("project_deliverable_id", "int");
        table.specificType("detail_amount", "money");
        table.specificType("recovery_area", "int");
        table.specificType("resource_type", "varchar(255)");
        table.specificType("stob", "varchar(255)");
        table.specificType("client_coding_id", "int");
        table.specificType("contract_id", "int");
      })
      .createTable("project_budget_jv", function (table) {
        table.increments();
        table.specificType("project_budget_id", "int");
        table.specificType("jv_id", "int");
      })
      .createTable("project_deliverable", function (table) {
        table.increments();
        table.specificType("deliverable_name", "varchar(255)");
        table.specificType("description", "text");
        table.specificType("start_date", "timestamp");
        table.specificType("completion_date", "timestamp");
        table.specificType("deliverable_amount", "money");
        table.specificType("recoverable_amount", "money");
        table.specificType("project_id", "int");
        table.specificType("comments", "text");
        table.specificType("fiscal", "int");
        table.specificType("deliverable_status", "varchar(255)");
        table.specificType("percent_complete", "double precision");
        table.specificType("health_id", "int");
        table.specificType("is_expense", "boolean");
      })
      .createTable("project_engagement", function (table) {
        table.increments();
        table.specificType("project_id", "int").notNullable();
        table.specificType("engagement_phase_id", "int").notNullable();
        table.specificType("health_id", "int").notNullable();
        table.specificType("status", "text");
        table.specificType("notes", "text");
        table.specificType("effort", "varchar(50)");
        table.specificType("site_address", "text");
        table.specificType("anticipated_site_launch_date", "timestamp");
        table.specificType("actual_site_launch_date", "timestamp");
        table.specificType("anticipated_site_close_date", "timestamp");
        table.specificType("actual_site_close_date", "timestamp");
        table.specificType("partnership_agreement_sent_date", "timestamp");
        table.specificType("partnership_agreement_signed_date", "timestamp");
        table.specificType("graphics_request_submitted_date", "timestamp");
        table.specificType("pia_sent_to_ocio_date", "timestamp");
      })
      .createTable("project_engagement_checklist_item", function (table) {
        table.increments();
        table.specificType("project_engagement_id", "int").notNullable();
        table.specificType("engagement_checklist_item_id", "int").notNullable();
        table.specificType("checked", "boolean").notNullable();
        table.specificType("date_checked", "timestamp");
      })
      .createTable("project_lesson", function (table) {
        table.increments();
        table.specificType("project_id", "int").notNullable();
        table.specificType("lesson_category_id", "int").notNullable();
        table.specificType("lesson_sub_category", "varchar(100)").notNullable();
        table.specificType("lesson", "text").notNullable();
        table.specificType("recommendations", "text");
      })
      .createTable("project_milestone", function (table) {
        table.increments();
        table.specificType("project_id", "int").notNullable();
        table.specificType("description", "varchar(255)").notNullable();
        table.specificType("fiscal_id", "int").notNullable();
        table.specificType("target_completion_date", "timestamp").notNullable();
        table.specificType("status", "varchar(255)").notNullable();
        table.specificType("health_id", "int").notNullable();
        table.specificType("actual_completion_date", "timestamp");
      })
      .createTable("project_phase", function (table) {
        table.increments();
        table.specificType("phase_name", "varchar(20)").notNullable();
        table.specificType("sort_order", "double precision");
        table.specificType("inactive", "boolean");
      })
      .createTable("project_risk", function (table) {
        table.increments();
        table.specificType("project_id", "int").notNullable();
        table.specificType("risk_factor_id", "int").notNullable();
        table.specificType("risk_score_id", "int");
      })
      .createTable("project_status", function (table) {
        table.increments();
        table.specificType("project_id", "int").notNullable();
        table.specificType("project_phase_id", "int").notNullable();
        table.specificType("health_id", "int").notNullable();
        table.specificType("schedule_health_id", "int");
        table.specificType("budget_health_id", "int");
        table.specificType("team_health_id", "int");
        table.specificType("reported_by_contact_id", "int").notNullable();
        table.specificType("status_date", "timestamp").notNullable();
        table.specificType("general_progress_comments", "text").notNullable();
        table.specificType("issues_and_decisions", "text");
        table.specificType("forecast_and_next_steps", "text");
        table.specificType("identified_risk", "text");
      })
      .createTable("project_strategic_alignment", function (table) {
        table.increments();
        table.specificType("project_id", "int").notNullable();
        table.specificType("strategic_alignment_id", "int").notNullable();
        table.specificType("checked", "boolean");
        table.specificType("modified", "boolean");
      })
      .createTable("recovery_type", function (table) {
        table.increments();
        table.specificType("recovery_type_name", "varchar(50)").notNullable();
        table.specificType("inactive", "boolean").notNullable();
      })
      .createTable("report", function (table) {
        table.increments();
        table.specificType("report_category_id", "int").notNullable();
        table.specificType("report_name", "varchar(100)").notNullable();
        table.specificType("report_object_name", "varchar(100)").notNullable();
        table.specificType("sort_order", "int").notNullable();
        table.specificType("bypass_filter_creation", "boolean").notNullable();
        table.specificType("inactive", "boolean").notNullable();
      })
      .createTable("report_category", function (table) {
        table.increments();
        table.specificType("report_category_name", "varchar(100)").notNullable();
        table.specificType("sort_order", "int").notNullable();
        table.specificType("inactive", "boolean").notNullable();
      })
      .createTable("report_control", function (table) {
        table.increments();
        table.specificType("control_name", "varchar(100)").notNullable();
        table.specificType("friendly_name", "varchar(100)");
        table.specificType("inactive", "boolean").notNullable();
      })
      .createTable("report_control_field", function (table) {
        table.increments();
        table.specificType("report_id", "int").notNullable();
        table.specificType("report_control_id", "int").notNullable();
        table.specificType("required", "boolean").notNullable();
        table.specificType("field_name", "varchar(100)");
        table.specificType("operator", "varchar(20)");
        table.specificType("delimiter", "varchar(100)");
        table.specificType("friendly_name_override", "varchar(100)");
      })
      .createTable("resource", function (table) {
        table.increments();
        table.specificType("supplier_id", "int");
        table.specificType("subcontractor_id", "int");
        table.specificType("resource_last_name", "varchar(255)");
        table.specificType("resource_first_name", "varchar(255)");
        table.specificType("created_date", "timestamp");
        table.specificType("user_id", "varchar(255)");
      })
      .createTable("resource_supplier_rates", function (table) {
        table.increments();
        table.specificType("resource_id", "int");
        table.specificType("supplier_rate_id", "int");
      })
      .createTable("resource_type", function (table) {
        table.increments();
        table.specificType("resource_type", "varchar(255)");
      })
      .createTable("risk_factor", function (table) {
        table.increments();
        table.specificType("risk_factor", "varchar(255)").notNullable();
        table.specificType("sort_order", "int");
        table.specificType("inactive", "boolean");
      })
      .createTable("risk_level", function (table) {
        table.increments();
        table.specificType("risk_score", "int").notNullable();
        table.specificType("risk_level", "varchar(255)").notNullable();
        table.specificType("colour_red", "int");
        table.specificType("colour_green", "int");
        table.specificType("colour_blue", "int");
      })
      .createTable("risk_profile", function (table) {
        table.increments();
        table.specificType("risk_profile", "varchar(20)").notNullable();
        table.specificType("recommendation", "varchar(255)");
        table.specificType("lower_score_threshold", "int").notNullable();
        table.specificType("upper_score_threshold", "int");
        table.specificType("colour_red", "int");
        table.specificType("colour_green", "int");
        table.specificType("colour_blue", "int");
      })
      .createTable("sid_internal_coding", function (table) {
        table.increments();
        table.specificType("contract_id", "int").notNullable();
        table.specificType("portfolio_id", "int");
        table.specificType("stob", "varchar(255)");
        table.specificType("wip_no", "varchar(255)");
        table.specificType("asset_tag", "varchar(255)");
        table.specificType("cas_project_number", "varchar(255)");
        table.specificType("qualified_receiver", "varchar(255)");
      })
      .createTable("sid_internal_coding_recovery_type", function (table) {
        table.increments();
        table.specificType("sid_internal_coding_id", "int").notNullable();
        table.specificType("recovery_type_id", "int").notNullable();
      })
      .createTable("strategic_alignment", function (table) {
        table.increments();
        table.specificType("description", "varchar(255)").notNullable();
        table.specificType("short_description", "varchar(20)");
        table.specificType("sort_order", "double precision");
        table.specificType("inactive", "boolean");
      })
      .createTable("subcontractor", function (table) {
        table.increments();
        table.specificType("subcontractor_name", "varchar(255)").notNullable();
      })
      .createTable("supplier", function (table) {
        table.increments();
        table.specificType("supplier_number", "int");
        table.specificType("site_number", "varchar(255)");
        table.specificType("supplier_name", "varchar(255)");
        table.specificType("signing_authority_name", "varchar(255)");
        table.specificType("signing_authority_title", "varchar(255)");
        table.specificType("address", "varchar(255)");
        table.specificType("city", "varchar(255)");
        table.specificType("province", "varchar(255)");
        table.specificType("country", "varchar(255)");
        table.specificType("postal_code", "varchar(255)");
        table.specificType("phone", "varchar(255)");
        table.specificType("fax", "varchar(255)");
        table.specificType("email", "varchar(255)");
        table.specificType("website", "varchar(255)");
        table.specificType("financial_contact_name", "varchar(255)");
        table.specificType("financial_contact_phone", "varchar(255)");
        table.specificType("financial_contact_email", "varchar(255)");
        table.specificType("supplier_legal_name", "varchar(255)");
      })
      .createTable("supplier_rate", function (table) {
        table.increments();
        table.specificType("resource_type_id", "int");
        table.specificType("supplier_id", "int");
        table.specificType("rate", "money");
        table.specificType("competency", "varchar(255)");
      });
  });
};

exports.down = function (knex) {
  return knex.raw(
    "SET session_replication_role = 'replica'; DROP SCHEMA data CASCADE; SET session_replication_role = 'origin';"
  );
};

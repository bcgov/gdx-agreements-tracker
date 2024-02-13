const projects_json = `
CREATE OR REPLACE VIEW data.projects_with_json AS
SELECT 
    p.id,
    json_build_object('value', p.fiscal, 'label', 
                        CASE 
                            WHEN f.fiscal_year IS NULL THEN ''
                            ELSE f.fiscal_year 
                        END) AS fiscal,
    p.project_number,
    p.project_version,
    p.project_name,
    p.project_manager,
    json_build_object('value', p.portfolio_id, 'label', 
                        CASE 
                            WHEN p.portfolio_id IS NULL THEN ''
                            ELSE concat(portfolio.portfolio_name, ' ', portfolio.portfolio_abbrev)
                        END) AS portfolio_id,
    json_build_object('value', p.classification, 'label', 
                        CASE 
                            WHEN p.classification IS NULL THEN ''
                            ELSE p.classification
                        END) AS classification,
    json_build_object('value', p.project_type, 'label', 
                        CASE 
                            WHEN p.project_type IS NULL THEN ''
                            ELSE p.project_type
                        END) AS project_type,
     json_build_object('value', p.funding, 'label', 
                        CASE 
                            WHEN p.funding IS NULL THEN ''
                            ELSE p.funding
                        END) AS funding,
    json_build_object('value', p.recoverable, 'label', 
                        CASE 
                            WHEN p.recoverable IS NULL THEN ''
                            ELSE p.recoverable
                        END) AS recoverable,
    json_build_object('value', p.ministry_id, 'label', 
                        CASE 
                            WHEN p.ministry_id IS NULL THEN ''
                            ELSE concat(ministry.ministry_name, ' ', ministry.ministry_short_name)
                        END) AS ministry_id,
    json_build_object('value', p.agreement_type, 'label', p.agreement_type) AS agreement_type,
    p.agreement_start_date,
    p.agreement_end_date,
    p.total_project_budget,
    p.recoverable_amount,
    p.description,
    p.initiation_date,
    p.lead,
    p.notes,
    json_build_object('value', p.project_status, 'label', 
                        CASE 
                            WHEN p.project_status IS NULL THEN ''
                            ELSE project_status
                        END) AS project_status,
    p.planned_start_date,
    p.planned_end_date,
    p.planned_budget,
    p.agreement_signed_date,
    p.situation_rationale,
    p.project_goals,
    p.out_of_scope,
    p.functional_changes_required,
    p.has_public_data,
    p.strategic_alignments_added,
    p.close_out_date,
    p.completed_by_contact_id,
    p.actual_completion_date,
    p.hand_off_to_operations,
    p.records_filed,
    p.contract_ev_completed,
    p.contractor_security_terminated
FROM 
    data.project p
LEFT JOIN 
    data.fiscal_year f ON p.fiscal = f.id
LEFT JOIN 
    data.portfolio portfolio ON p.portfolio_id = portfolio.id
LEFT JOIN 
    data.ministry ministry ON p.ministry_id = ministry.id;
`;

exports.up = function (knex) {
  return knex.raw(projects_json);
};

exports.down = function (knex) {
  return knex.raw(`DROP VIEW projects_with_json;`);
};

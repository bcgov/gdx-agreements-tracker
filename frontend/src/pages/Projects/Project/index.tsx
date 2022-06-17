import { FormControl, InputLabel, MenuItem, Select, styled, TextField } from "@mui/material";
import { Field, Formik } from "formik";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { apiAxios } from "../../../utils";
import { ProjectRegistrationSection } from "./ProjectRegistrationSection";

export const Project = () => {
  const { projectId } = useParams();

  const getProject = async () => {
    const project = await apiAxios().get(`projects/${projectId}`);
    return project;
  };

  // Queries
  const projectQuery = useQuery(`project - ${projectId}`, getProject);
  console.log('projectQuery', projectQuery)

  return (
    <>
      {true === projectQuery.isLoading ? (
        <div>Loading</div>
      ) : (
        <ProjectRegistrationSection query={projectQuery} />
      )}

      <Outlet />
    </>
  );
};

/**
 * Project Number {Project Number}
 * Project Name {input}
 * Version {input}
 * Client Ministry Name
 * Registration Date {date}
 * Portfolio Name {dropdown}
 * Planned Start Date {date}
 * Portfolio Name {dropdown}
 * Planned End Date {date}
 * Fiscal {dropdown}
 * Planned Budget {money}
 * Project Type {dropdown}
 * Project status {dropdown}
 * Funding {dropdown}
 * Total Budget {money}
 * Recovery Details {dropdown}
 * Recoverable Total {money}
 * Contract # {link}
 *
 */

//  actual_completion_date: "2018-04-30T07:00:00.000Z"
//  ​​​
//  agreement_end_date: null
//  ​​​
//  agreement_signed_date: null
//  ​​​
//  agreement_start_date: null
//  ​​​
//  agreement_type: "Other"
//  ​​​
//  classification: "Support for Strategic or Business Planning"
//  ​​​
//  close_out_date: "2018-05-15T07:00:00.000Z"
//  ​​​
//  completed_by_contact_id: 265
//  ​​​
//  contract_ev_completed: "Yes"
//  ​​​
//  contractor_security_terminated: "N/A"
//  ​​​
//  description: "Public engagement strategy to support agreement-making with First Nations in Northeast BC. No public launch."
//  ​​​
//  fiscal: 8
//  ​​​
//  functional_changes_required: null
//  ​​​
//  funding: null
//  ​​​
//  hand_off_to_operations: "N/A"
//  ​​​
//  has_public_data: null
//  ​​​
//  id: 658
//  ​​​
//  initiation_date: "2017-09-04T07:00:00.000Z"
//  ​​​
//  lead: null
//  ​​​
//  ministry_id: 49
//  ​​​
//  notes: null
//  ​​​
//  out_of_scope: null
//  ​​​
//  planned_budget: null
//  ​​​
//  planned_end_date: "2018-03-31T07:00:00.000Z"
//  ​​​
//  planned_start_date: "2017-09-04T07:00:00.000Z"
//  ​​​
//  portfolio_id: 4
//  ​​​
//  project_goals: null
//  ​​​
//  project_manager: 265
//  ​​​
//  project_name: "MIRR Northeast"
//  ​​​
//  project_number: "18-034"
//  ​​​
//  project_status: "Complete"
//  ​​​
//  project_type: "External"
//  ​​​
//  project_version: null
//  ​​​
//  records_filed: "N/A"
//  ​​​
//  recoverable: "Fully"
//  ​​​
//  recoverable_amount: "$0.00"
//  ​​​
//  situation_rationale: null
//  ​​​
//  strategic_alignments_added: true
//  ​​​
//  total_project_budget: "$0.00"

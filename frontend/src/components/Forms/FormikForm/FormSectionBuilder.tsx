import { Box, TextField, Grid } from "@mui/material";
import { Field } from "formik";
import React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled, useTheme } from "@mui/material";

export const FormSectionBuilder = ({ errors, setFieldValue, formikValues, handleChange }: any) => {
  const layoutFromDB = {
    client_ministry_name: { type: "text", maxLength: "99" },
    contract_number: { type: "text", maxLength: "99" },
    date_signed: { type: "text", maxLength: "99" },
    description: { type: "text", maxLength: "99" },
    end_date: { type: "date", maxLength: "99" },
    fiscal: { type: "text", maxLength: "99" },
    funding: { type: "text", maxLength: "99" },
    id: { type: "number", maxLength: "99" },
    planned_budget: { type: "text", maxLength: "99" },
    planned_end_date: { type: "date", maxLength: "99" },
    planned_start_date: { type: "date", maxLength: "99" },
    portfolio_name: { type: "text", maxLength: "99" },
    project_name: { type: "text", maxLength: "99" },
    project_number: { type: "text", maxLength: "99" },
    project_status: { type: "text", maxLength: "99" },
    project_type: { type: "text", maxLength: "99" },
    recoverable_total: { type: "text", maxLength: "99" },
    recovery_details: { type: "text", maxLength: "99" },
    registration_date: { type: "date", maxLength: "99" },
    start_date: { type: "date", maxLength: "99" },
    total_budget: { type: "text", maxLength: "99" },
    type: { type: "text", maxLength: "99" },
    version: { type: "text", maxLength: "99" },
  };

  const StyledBox = styled("div")({
    width: "100%",
    padding: "20px",
    display: "inline-block",
    margin: "5px",
  });

  return (
    <>
      {Object.entries(layoutFromDB).map(([key, value]) => {
        switch (value.type) {
          case "date":
            return (
              <StyledBox>
                <LocalizationProvider dateAdapter={AdapterMoment} key={key}>
                  <Field
                    onChange={(newValue: any) => {
                      setFieldValue(key, newValue);
                    }}
                    key={key}
                    value={formikValues[key]}
                    as={DatePicker}
                    name={key}
                    renderInput={(params: any) => <TextField {...params} />}
                    label={key}
                  />
                </LocalizationProvider>
              </StyledBox>
            );
          case "number":
          case "text":
            return (
              <StyledBox>
                <Field
                  key={key}
                  as={TextField}
                  name={key}
                  type={value.type}
                  onChange={handleChange}
                  label={key}
                />
              </StyledBox>
            );
        }
      })}
    </>
  );
};

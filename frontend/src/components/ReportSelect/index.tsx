import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Button,
} from "@mui/material";
import { IOption, IReportParamOptions } from "../../types";
import { reportCategory, reportType, reportDescription, reportParameters } from "./fields";
import { FormInput } from "components/FormInput";
import { Formik, Form } from "formik";
import axios from "axios";

export const ReportSelect = () => {
  const queryFields = ["fiscal", "quarter", "portfolio"];
  // todo: These reports will download as a json file temporarily. Remove when templates are created.
  const jsonReports = ["project-dashboard", "active-projects"];
  // Handle state changes
  const [category, setCategory] = useState<string>();
  const [reportParamCategory, setReportParamCategory] = useState<string[] | null>(null);
  const [currentReportType, setCurrentReportType] = useState<string | null>(null);

  const handleChangeCategory = (value: string) => {
    setCurrentReportType(null);
    setReportParamCategory(null);
    setCategory(value);
  };

  const handleChangeType = (value: string) => {
    const option = reportType.options.find((option) => option.value === value);
    setReportParamCategory((option as IReportParamOptions).reportParamCategory);
    setCurrentReportType(value);
  };

  const renderRadioGroup = (params: {
    name: string;
    formLabel: string;
    defaultOption: { label: string; value: string };
    options: {
      value: string;
      label: string;
    }[];
  }) => {
    return params.options.map((radioButton: { [key: string]: string }) => {
      if (radioButton?.reportCategory) {
        if (radioButton?.reportCategory === category) {
          return (
            <FormControlLabel
              value={radioButton.value}
              label={radioButton.label}
              key={radioButton.value + "_radio_button"}
              control={<Radio />}
            />
          );
        }
      } else {
        return (
          <FormControlLabel
            value={radioButton.value}
            label={radioButton.label}
            key={radioButton.value + "_radio_button"}
            control={<Radio />}
          />
        );
      }
    });
  };

  const renderParameters = (
    setFieldValue: Function | undefined,
    handleChange: Function | React.ChangeEvent<HTMLInputElement> | undefined,
    values: { [x: string]: string | number | boolean | IOption | IOption[] }
  ) => {
    {
      return reportParameters.options.map(
        ({ fieldName, fieldType, fieldLabel, width, tableName, pickerName }) => {
          if (reportParamCategory?.includes(fieldName, 0)) {
            return (
              <FormInput
                setFieldValue={setFieldValue}
                fieldValue={values?.[fieldName] || ("multiselect" === fieldType ? [] : "")}
                fieldName={fieldName}
                fieldType={fieldType}
                fieldLabel={fieldLabel}
                handleChange={handleChange}
                width={width}
                key={fieldName}
                tableName={tableName}
                pickerName={pickerName}
              />
            );
          }
        }
      );
    }
  };

  const renderDescription = () => {
    return reportDescription.options.map((description) => {
      if (description?.reportType?.includes(currentReportType as unknown as string, 0)) {
        return <p key={description.value}>{description.value}</p>;
      }
    });
  };

  const onExportButtonClick = (values: {
    [key: string]: { value: number | string; label: string };
  }) => {
    const baseUri = `https://localhost:8080/report/projects`;
    const reportUri = `${values.report_type}`;
    let url = "";
    // This will need to change as more report types are added
    if (values.project) {
      url = `${baseUri}/${values.project.value}/${reportUri}`;
    } else {
      url = `${baseUri}/${reportUri}`;
    }
    // Build querystring params
    const querystringParams = new URLSearchParams();
    for (const field in values) {
      if (queryFields.includes(field)) {
        if (values[field] instanceof Array) {
          const options = values[field] as unknown as IOption[];
          for (const value of options) {
            querystringParams.append(field, value.value.toString());
          }
        } else {
          querystringParams.append(field, values[field].value.toString());
        }
      }
    }

    axios(url, {
      method: "GET",
      params: querystringParams,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        responseType: "arraybuffer",
      },
      responseType: "blob",
    })
      .then((response) => {
        const fileURL = window.URL.createObjectURL(response.data);
        const alink = document.createElement("a");
        alink.href = fileURL;
        if (jsonReports.includes(reportUri)) {
          alink.download = `${values.report_type}.json`;
        } else {
          alink.download = `${values.report_type}.pdf`;
        }
        alink.click();
      })
      .catch((err) => {
        // Handle the error gracefully - to be addressed in a future ticket
        alert(err);
      });
  };

  const initialValues = { [reportCategory.name]: reportCategory.defaultOption };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onExportButtonClick}>
        {({ setFieldValue, values, handleChange, dirty }) => {
          return (
            <Form>
              <FormControl>
                <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={4} sm={8} md={12}>
                    <FormLabel id="category-control-group">{reportCategory.formLabel}</FormLabel>
                    <RadioGroup
                      name={reportCategory.name}
                      value={values[reportCategory.name] || ""}
                      onChange={(event, value) => {
                        setFieldValue(reportCategory.name, value);
                        handleChangeCategory(value);
                      }}
                    >
                      {renderRadioGroup(reportCategory)}
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4} sm={8} md={12}>
                    <FormLabel id="type-control-group">{reportType.formLabel}</FormLabel>
                    <RadioGroup
                      name={reportType.name}
                      value={values[reportType.name] || ""}
                      onChange={(event, value) => {
                        setFieldValue(reportType.name, value);
                        handleChangeType(value);
                      }}
                    >
                      {renderRadioGroup(reportType)}
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4} sm={8} md={12}>
                    <FormLabel id="parameters-control-group">
                      {reportParameters.formLabel}
                    </FormLabel>
                    {renderParameters(setFieldValue, handleChange, values)}
                  </Grid>
                  <Grid item xs={4} sm={8} md={12}>
                    <FormLabel id="description">{reportDescription.formLabel}</FormLabel>
                    {renderDescription()}
                  </Grid>
                  <Grid item>
                    <Box
                      m={1}
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      role={"submit_button"}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={dirty ? false : true}
                      >
                        Export PDF
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </FormControl>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

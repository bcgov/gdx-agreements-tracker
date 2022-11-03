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
import { Formik, Form, Field } from "formik";
import axios from "axios";

export const ReportSelect = () => {
  // Handle state changes
  const [category, setCategory] = useState<any>();
  const [reportParamCategory, setReportParamCategory] = useState<any>();
  const [currentReportType, setCurrentReportType] = useState(null);

  const handleChangeCategory = (value: string) => {
    setCurrentReportType(null);
    setReportParamCategory(null);
    setCategory(value);
  };

  const handleChangeType = (value: any) => {
    const option = reportType.options.find((option) => option.value === value);
    setReportParamCategory((option as IReportParamOptions).reportParamCategory);
    setCurrentReportType(value);
  };

  const renderRadioGroup = (params: any) => {
    return params.options.map((radioButton: any) => {
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
                fieldValue={values?.[fieldName] || ''}
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

  const onExportButtonClick = (values: any) => {
    const baseUri = `https://localhost:8080/report/projects`;
    const reportUri = `${values.report_type}`;
    // This will need to change as more report types are added
    const url = `${baseUri}/${values.project.value}/${reportUri}`;
    axios(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        responseType: "arraybuffer",
      },
      responseType: "blob",
    })
      .then((response: any) => {
        const fileURL = window.URL.createObjectURL(response.data);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "SamplePDF.pdf"; // Need dynamic names
        alink.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialValues = { [reportCategory.name]: reportCategory.defaultOption };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onExportButtonClick}>
        {({ setFieldValue, values, handleChange, dirty }: any) => {
          return (
            <Form>
              <FormControl>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={4} sm={4} md={6}>
                    <FormLabel id="category-control-group">{reportCategory.formLabel}</FormLabel>
                    <Box border={2} borderRadius={1} padding={1}>
                      <RadioGroup
                        name={reportCategory.name}
                        value={values[reportCategory.name] || ''}
                        onChange={(event, value) => {
                          setFieldValue(reportCategory.name, value);
                          handleChangeCategory(value);
                        }}
                      >
                        {renderRadioGroup(reportCategory)}
                      </RadioGroup>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={4} md={6}>
                    <FormLabel id="type-control-group">{reportType.formLabel}</FormLabel>
                    <Box border={2} borderRadius={1} padding={1}>
                      <RadioGroup
                        name={reportType.name}
                        value={values[reportType.name] || ''}
                        onChange={(event, value) => {
                          setFieldValue(reportType.name, value);
                          handleChangeType(value);
                        }}
                      >
                        {renderRadioGroup(reportType)}
                      </RadioGroup>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={8} md={12}>
                    <FormLabel id="parameters-control-group">
                      {reportParameters.formLabel}
                    </FormLabel>
                    <Box border={2} borderRadius={1} padding={1}>
                      {renderParameters(setFieldValue, handleChange, values)}
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={8} md={12}>
                    <FormLabel id="description">{reportDescription.formLabel}</FormLabel>
                    <Box border={2} borderRadius={1} padding={1}>
                      {renderDescription()}
                    </Box>
                  </Grid>
                </Grid>
              </FormControl>

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
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

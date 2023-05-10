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
import { IEditField, IOption, IReportParamOptions } from "../../types";
import { FormInput } from "components/FormInput";
import { useAxios } from "hooks/useAxios";
import { Formik, Form } from "formik";
import {
  reportCategory,
  reportDescription,
  reportParameters,
  reportType,
  requestTypes,
} from "./fields";

export const ReportSelect = () => {
  const { axiosAll } = useAxios();
  // todo: These reports will download as a json file temporarily. Remove when templates are created.
  const jsonReports = ["project-dashboard", "contract-summary"];

  // Handle state changes
  const [category, setCategory] = useState<string>();
  const [reportParamCategory, setReportParamCategory] = useState<
    { field: IEditField; type: number; isRequired: boolean }[] | null
  >(null);
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
      return reportParamCategory?.map((item) => {
        const { fieldName, fieldType, fieldLabel, width, tableName, pickerName } = item.field;
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
      });
    }
  };

  const renderDescription = () => {
    return reportDescription.options.map((description) => {
      if (description?.reportType?.includes(currentReportType as unknown as string, 0)) {
        return <p key={description.value}>{description.value}</p>;
      }
    });
  };

  const onExportButtonClick = (values: { [key: string]: { value: string } }) => {
    const reportUri = `${values.report_type}`;
    let url = `report/projects/${reportUri}`;
    let routeParam;
    const querystringParams = new URLSearchParams();
    try {
      // Build querystring and route params from input values.
      if (reportParamCategory) {
        for (const param of reportParamCategory) {
          if (values[param.field.fieldName]) {
            const field = param.field.fieldName;
            const value = values[param.field.fieldName];
            // If the input is query type, add the value(s) to the querystring.
            if (param.type === requestTypes.query) {
              if (value instanceof Array) {
                // Multiselect input values come as arrays and each element must be added to querystring.
                const options = value;
                for (const value of options) {
                  querystringParams.append(field, value.value);
                }
              } else if (values[field].value) {
                querystringParams.append(field, values[field].value);
              } else {
                querystringParams.append(field, value.toString());
              }
            } else {
              // If the request type is route, we will add that value to the route params.
              querystringParams.append(field, value.value.toString());
            }
          } else if (param.isRequired) {
            throw new Error(`${param.field.fieldName} field is required.`);
          }
        }
      }
      // This will need to change as more report types are added
      if (routeParam) {
        url = `report/projects/${routeParam}/${reportUri}`;
      }
      axiosAll()
        .get(url, {
          params: querystringParams,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            responseType: "arraybuffer",
          },
          responseType: "blob",
        })
        .then((response) => {
          // attn: Adam - Handle the error gracefully - to be addressed in a future ticket
          try {
            const fileURL = window.URL.createObjectURL(response?.data);
            const alink = document.createElement("a");
            alink.href = fileURL;
            if (jsonReports.includes(reportUri)) {
              alink.download = `${values.report_type}.json`;
            } else {
              alink.download = `${values.report_type}.pdf`;
            }
            alink.click();
          } catch (err) {
            alert(err);
          }
        });
    } catch (err) {
      // Handle the error gracefully - to be addressed in a future ticket
      alert(err);
    }
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

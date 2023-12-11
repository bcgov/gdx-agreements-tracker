import { FormInput } from "components/Forms/Fields";
import { Form, Formik, FormikValues } from "formik";
import { IEditField, YupSchema } from "types";
import { FormButtons } from "./FormButtons";
import { FormLayout } from "../FormLayout";

interface IEditForm {
  handleOnSubmit: ((values: unknown) => void | Promise<void>) & Function;
  handleOnCancel: Function;
  initialValues: FormikValues;
  editFields: IEditField[];
  validationSchema?: YupSchema<{ [key: string]: Function }>;
}

export const InputForm = ({
  handleOnSubmit,
  initialValues,
  handleOnCancel,
  editFields,
  validationSchema,
}: IEditForm) => {
  return (
    <Formik
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ setFieldValue, values, handleChange, dirty, errors, touched }) => {
        return (
          <Form>
            <FormLayout>
              {editFields.map(
                ({
                  fieldName,
                  fieldType,
                  fieldLabel,
                  width,
                  tableName,
                  pickerName,
                  projectId,
                  contractId,
                  required,
                  autocompleteTableColumns,
                  customMoneyHandler,
                  disabled,
                }) => {
                  return (
                    <FormInput
                      errors={errors}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      customMoneyHandler={customMoneyHandler}
                      formikValues={values}
                      fieldValue={values?.[fieldName]}
                      fieldName={fieldName}
                      fieldType={fieldType}
                      fieldLabel={fieldLabel}
                      width={width}
                      key={fieldName}
                      tableName={tableName}
                      pickerName={pickerName}
                      projectId={projectId}
                      contractId={contractId}
                      required={required}
                      touched={touched}
                      autocompleteTableColumns={autocompleteTableColumns}
                      disabled={disabled}
                    />
                  );
                }
              )}
            </FormLayout>
            <FormButtons handleOnCancel={handleOnCancel} dirty={dirty}></FormButtons>
          </Form>
        );
      }}
    </Formik>
  );
};

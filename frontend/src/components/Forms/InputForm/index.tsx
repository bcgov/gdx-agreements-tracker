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

/**
 * InputForm component renders a form using Formik for handling form state and validation.
 *
 * @param   {object}      props                  - The input form component props.
 * @param   {Function}    props.handleOnSubmit   - Function to handle form submission.
 * @param   {object}      props.initialValues    - Initial values for the form fields.
 * @param   {Function}    props.handleOnCancel   - Function to handle form cancellation.
 * @param   {Array}       props.editFields       - Array of field configurations for the form.
 * @param   {object}      props.validationSchema - Validation schema for the form fields.
 * @returns {JSX.Element}                        - The rendered InputForm component.
 */
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
      validateOnChange={true}
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
                  customOnChange = () => {},
                  generateValueButton,
                }) => {
                  return (
                    <FormInput
                      errors={errors}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
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
                      customOnChange={(newValue: Object) => {
                        customOnChange({ formikValues: values, setFieldValue, newValue });
                      }}
                      generateValueButton={generateValueButton}
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

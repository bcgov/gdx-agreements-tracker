import { FormInput } from "components/FormInput";
import { FormLayout } from "components/GDXForm";
import { Form, Formik, FormikValues } from "formik";
import { IEditField } from "types";
import { FormButtons } from "../FormButtons";

interface IEditForm {
  handleOnSubmit: ((values: unknown) => void | Promise<void>) & Function;
  handleOnCancel: Function;
  initialValues: FormikValues;
  editFields: IEditField[];
}

export const InputForm = ({
  handleOnSubmit,
  initialValues,
  handleOnCancel,
  editFields,
}: IEditForm) => {
  return (
    <Formik onSubmit={handleOnSubmit} initialValues={initialValues}>
      {({ setFieldValue, values, handleChange, dirty }) => {
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
                  required
                }) => {
                  return (
                    <FormInput
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

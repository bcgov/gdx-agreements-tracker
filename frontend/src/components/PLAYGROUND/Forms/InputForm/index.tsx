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
                }) => {
                  return (
                    <FormInput
                      setFieldValue={setFieldValue}
                      fieldValue={values?.[fieldName]}
                      fieldName={fieldName}
                      fieldType={fieldType}
                      fieldLabel={fieldLabel}
                      handleChange={handleChange}
                      width={width}
                      key={fieldName}
                      tableName={tableName}
                      pickerName={pickerName}
                      projectId={projectId}
                      contractId={contractId}
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

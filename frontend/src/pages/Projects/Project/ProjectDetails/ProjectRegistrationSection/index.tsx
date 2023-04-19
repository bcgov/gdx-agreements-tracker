import { EditForm } from "components/EditForm";
import { ReadForm } from "components/ReadForm";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";
import { useFormControls, useFormSubmit, useFormLock } from "hooks";
import { FormEditButton } from "components/FormEditButton";
import useDBLockRender from "hooks/useDBLockRender";
import useFormRender from "hooks/useFormRender";

/**
 * This is a React component that renders a form for registering a project, with options for editing
 * and locking the form.
 *
 * @param - The `ProjectRegistrationSection` component takes in a single object as its parameter,
 *    which has a `query` property. The `query` property is of type `any`, but it is expected to contain
 *    data related to a specific project. The component uses this data to render a form that allows the
 */

export const ProjectRegistrationSection = ({
  query,
}: {
  // todo Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
}) => {
  const { projectId } = useParams();
  const { handleUpdate, Notification } = useFormSubmit();
  const { handleEditMode, editMode } = useFormControls();
  const { handleDbLock, removeLock } = useFormLock();

  const editForm = (
    <EditForm
      initialValues={query?.data?.data}
      onSubmit={async (values) => {
        return handleUpdate({
          changedValues: values,
          currentRowData: query?.data?.data,
          apiUrl: `projects/${projectId}`,
          handleEditMode: handleEditMode,
          queryKeys: [`project - ${projectId}`],
          successMessage: `Changes saved successfully for project ${projectId}`,
          errorMessage: `There was an issue saving your changes for project ${projectId}`,
        });
      }}
      onCancel={async () => {
        await removeLock(query?.data?.dbRowLock).then(async () => {
          await query.refetch().then(() => {
            handleEditMode(false);
          });
        });
      }}
      editFields={editFields()}
    />
  );

  const readForm = (
    <>
      <ReadForm fields={readFields(query)} />
      <FormEditButton
        buttonText="Change Registration"
        onClick={async () => {
          await handleDbLock(query, projectId).then(async () => {
            await query.refetch().then(() => {
              handleEditMode(true);
            });
          });
        }}
      />
    </>
  );

  const [renderForm] = useFormRender(
    editForm,
    readForm,
    editMode,
    query?.data?.dbRowLock?.currentUser
  );
  const [renderDBLock] = useDBLockRender(
    query?.data?.dbRowLock,
    handleDbLock,
    removeLock,
    query,
    handleEditMode
  );

  useEffect(() => {
    // Certain properties when lacking a value have null labels causing errors.
    if (query?.data?.data) {
      if (null === query.data.data.fiscal.label) {
        query.data.data.fiscal.label = "";
      }
      if (null === query.data.data.project_status.label) {
        query.data.data.project_status.label = "";
      }
      if (null === query.data.data.funding.label) {
        query.data.data.funding.label = "";
      }
      query.data.data.version ?? "";
    }
  }, [query]);

  return (
    <>
      {query.isLoading ? (
        <div>Loading</div>
      ) : (
        renderDBLock(() => {
          return renderForm();
        })
      )}
      <Notification />
    </>
  );
};

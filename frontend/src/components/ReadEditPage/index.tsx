import { Box, Button } from "@mui/material";
import { CreateForm } from "components/CreateForm";
import { EditForm } from "components/EditForm";
import { ReadForm } from "components/ReadForm";
import { Renderer } from "components/Renderer";
import { FormikValues } from "formik";
import { useFormSubmit } from "hooks/useFormSubmit";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { ICapability, IEditFields, IWhat } from "types";
import { apiAxios } from "utils";

export const ReadEditPage = ({
  what,
  editFields,
  readFields,
  createFormInitialValues,
  capability,
  apiRoute,
  redirectRoute,
}: {
  what: IWhat;
  editFields: IEditFields[];
  readFields: Function;
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createFormInitialValues: any;
  capability: ICapability;
  apiRoute: string;
  redirectRoute: string;
}) => {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [isNew, setNew] = useState(false);
  const [createCompleted, setCreateCompleted] = useState(false);
  const [userHasEditCapability, setEditCapability] = useState(false);
  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  const getItem = async () => {
    if ("new" === id) {
      return null;
    }
    const item = await apiAxios().get(`${apiRoute}/${id}`);
    return item.data;
  };

  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = useQuery(`${apiRoute} - ${id}`, getItem, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    const user = query?.data?.user;
    setEditCapability(user && user.capabilities.includes(capability.updateOne));
    if ("new" === id) {
      setNew(true);
      setEditMode(true);
    }
  }, [query, id, capability]);

  if (createCompleted) {
    return <Navigate to={redirectRoute} />;
  }

  let content = <></>;
  switch (editMode) {
    case false:
    default:
      content = (
        <>
          <ReadForm fields={readFields(query)} />
          {userHasEditCapability && (
            <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
              <Button variant="contained" onClick={() => setEditMode(true)}>
                Change Contract
              </Button>
            </Box>
          )}
        </>
      );
      break;
    case true:
      content = (
        <>
          {isNew ? (
            <CreateForm
              initialValues={createFormInitialValues as FormikValues}
              onSubmit={async (values) => {
                return handlePost({
                  formValues: values,
                  apiUrl: apiRoute,
                  handleClose: () => {
                    setCreateCompleted(true);
                  },
                  handleEditMode: setEditMode,
                  queryKeys: [apiRoute],
                  successMessage: `Successfully created new ${what.single}.`,
                  errorMessage: `There was an issue creating your ${what.single}.`,
                });
              }}
              editFields={editFields}
            />
          ) : (
            <EditForm
              initialValues={query?.data?.data}
              onSubmit={async (values) => {
                return handleUpdate({
                  changedValues: values,
                  currentRowData: query?.data?.data,
                  apiUrl: `${apiRoute}/${id}`,
                  handleEditMode: setEditMode,
                  queryKeys: [`${apiRoute} - ${id}`],
                  successMessage: `Changes saved successfully for ${what.single} ${id}`,
                  errorMessage: `There was an issue saving your changes for ${what.single} ${id}`,
                });
              }}
              editFields={editFields}
            />
          )}
        </>
      );
      break;
  }

  return (
    <>
      <Renderer isLoading={query.isLoading} component={content} />
      <Notification />
    </>
  );
};

import { Grid, Skeleton } from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { FormEditButton } from "components/FormEditButton";
import { useParams } from "react-router";

interface IDBLockProps {
  handleDbLock: Function;
  removeLock: Function;
  // todo: Define a good type. "Any" type temporarily permitted.  The query:any type will be fixed when we upgrade to ReactQuery V4.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
  handleFormType: (formType: "read" | "edit" | "new") => void;
}

/* This is a functional component called `DBLock` that takes in four props: `handleDbLock`,
`removeLock`, `query`, and `handleEditMode`. It returns a JSX element that renders a grid with
various components, including `Skeleton`, `LockPersonIcon`, and `FormEditButton`. The `query` prop
is of type `any` for now, but will be fixed when the code is upgraded to ReactQuery V4. The
component also uses the `useParams` hook from React Router to get the `projectId` parameter from the
URL. When the `FormEditButton` is clicked, it calls various functions passed in as props to remove a
lock on a database row, handle a new lock, and set the edit mode to true. */

export const DBLock = ({ handleDbLock, removeLock, query, handleFormType }: IDBLockProps) => {
  const { projectId } = useParams();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        <Skeleton variant="rectangular" />
      </Grid>
      <Grid item xs={6} md={6}>
        <Skeleton variant="rectangular" />
      </Grid>
      <Grid item xs={6} md={6}>
        <LockPersonIcon />
        {/* <h1>section locked for editing by: {query?.data?.dbRowLock.locked_by}</h1> */}
      </Grid>
      <Grid item xs={6} md={6}></Grid>
      <Grid item xs={4} md={4}></Grid>
      <Grid item xs={4} md={4}></Grid>
      <Grid item xs={4} md={4}>
        <FormEditButton
          buttonText="Take Over Editing"
          onClick={async () => {
            await removeLock(query?.data?.dbRowLock).then(async () => {
              await handleDbLock(query, projectId).then(async () => {
                await query.refetch().then(() => {
                  handleFormType("edit");
                });
              });
            });
          }}
        />
      </Grid>
    </Grid>
  );
};

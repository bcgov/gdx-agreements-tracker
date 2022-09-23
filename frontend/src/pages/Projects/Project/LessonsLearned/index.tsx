import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";
import { TableData } from "components/TableData";
/**
 * The Amendments page
 *
 * @returns {JSX.Element} Amendments
 */

export const LessonsLearned: FC = (): JSX.Element => {
  /**
   * returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
   * reference: https://reactrouter.com/docs/en/v6/hooks/use-params
   *
   * @returns {string} projectId
   */

  const { projectId } = useParams();
  const roles = {
    get: "projects_read_all",
    add: "projects_add_one",
    update: "projects_update_one",
    delete: "projects_delete_one",
  };

  const createFormInitialValues = {
    lesson_category_id: "",
    lesson_sub_category: "",
    lesson: "",
    recommendations: "",
    project_id: projectId,
  };

  return (
    <>
      <TableData
        itemName="Lessons Learned"
        tableName="lessons-learned"
        getOneUrl={`projects/${projectId}/lessons-learned/{id}`}
        getAllUrl={`projects/${projectId}/lessons-learned`}
        createFormInitialValues={createFormInitialValues}
        readFields={readFields}
        editFields={editFields}
        roles={roles}
      />
    </>
  );
};

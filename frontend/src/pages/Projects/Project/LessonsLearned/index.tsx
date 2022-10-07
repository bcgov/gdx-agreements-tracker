import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";
import { TableComplete } from "components/TableComplete";
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

  const url = {
    getAll: `projects/${projectId}/lessons-learned`,
    getOne: `projects/${projectId}/lessons-learned/{id}`,
    updateOne: `projects/${projectId}/lessons-learned/{id}`,
    addOne: `/lessons-learned`,
    deleteOne: `lessons-learned/{id}`,
  };

  const createFormInitialValues = {
    lesson_category_id: "",
    lesson_sub_category: "",
    lesson: "",
    recommendations: "",
    project_id: projectId,
  };

  const columnWidths = {
    lesson: 3,
    recommendations: 3,
  };

  return (
    <>
      <TableComplete
        itemName="Lessons Learned"
        tableName="lessons-learned"
        columnWidths={columnWidths}
        url={url}
        createFormInitialValues={createFormInitialValues}
        readFields={readFields}
        editFields={editFields}
        roles={roles}
      />
    </>
  );
};

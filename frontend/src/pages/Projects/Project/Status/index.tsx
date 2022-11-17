import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { deliverablesBreakdownEditFields, deliverablesBreakdownReadFields } from "./fields";
import { TableComplete } from "components/TableComplete";
/**
 * The Amendments page
 *
 * @returns {JSX.Element} Amendments
 */

export const Status: FC = (): JSX.Element => {
  /**
   * returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
   * reference: https://reactrouter.com/docs/en/v6/hooks/use-params
   *
   * @returns {string} projectId
   */

  const { projectId } = useParams();
  const roles = {
    get: "projects_read_all",
    add: "project_lessons_add_one",
    update: "projects_update_one",
    delete: "projects_delete_one",
  };

  const url = {
    getAll: `projects/${projectId}/status`,
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
        itemName="Status Summary"
        tableName="project_status"
        columnWidths={columnWidths}
        url={url}
        createFormInitialValues={createFormInitialValues}
        readFields={deliverablesBreakdownReadFields}
        editFields={deliverablesBreakdownEditFields}
        roles={roles}
      />
    </>
  );
};

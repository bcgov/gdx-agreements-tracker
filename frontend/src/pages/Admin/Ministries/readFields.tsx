import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} ministriesQuery The react query data for specific ministry.
 * @returns {Array}
 */
export const readFields = (ministriesQuery: UseQueryResult<FormikValues>) => {
  return [
    { width: "half", title: "Ministry", value: ministriesQuery?.data?.ministry_name },
    { width: "half", title: "Abbr", value: ministriesQuery?.data?.ministry_short_name },
    { width: "half", title: "Is Active", value: ministriesQuery?.data?.is_active ? "Yes" : "No" },
  ];
};

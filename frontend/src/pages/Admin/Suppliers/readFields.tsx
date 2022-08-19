import React from "react";

export const readFields = (suppliersQuery: any) => {
  return [
    { width: "half", title: "Version", value: suppliersQuery?.data?.version },
    { width: "half", title: "Fiscal Year", value: suppliersQuery?.data?.fiscal_year?.label },
    { width: "half", title: "Initiation Date", value: suppliersQuery?.data?.initiation_date },
    { width: "half", title: "CR Contact", value: suppliersQuery?.data?.cr_contact },
    { width: "half", title: "Initiated By", value: suppliersQuery?.data?.initiated_by?.label },
    { width: "half", title: "Approval Date", value: suppliersQuery?.data?.approval_date },
    { width: "full", title: "Summary", value: suppliersQuery?.data?.summary },
  ];
};

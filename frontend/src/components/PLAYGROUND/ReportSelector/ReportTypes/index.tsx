import { FormControlLabel, Radio } from "@mui/material";
import React from "react";
import { IReportCategoriesAndTypes } from "types";
type SelectedCategory = {
  value: string;
  types: { label: string; value: string }[];
};
export const ReportTypes = ({
  values,
  categoriesAndTypes,
}: {
  values: { [key: string]: string | null };
  categoriesAndTypes: IReportCategoriesAndTypes;
}) => {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedCategory: any = categoriesAndTypes.find((item: { value: string }) => {
    return item.value === values.category;
  });

  return selectedCategory?.types.map((type: { label: string; value: string }) => {
    return (
      <FormControlLabel
        key={type.label}
        value={type.value}
        control={<Radio />}
        label={type.label}
      />
    );
  });
};

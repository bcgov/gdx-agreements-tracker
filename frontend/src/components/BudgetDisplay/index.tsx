import React from "react";
import { Grid } from "@mui/material";
import { GDXList } from "components/GDXList";
import { Loader } from "components/Loader";
import { useAxios } from "hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IBudget, IStandardRow } from "types";

export const BudgetDisplay = ({ apiUrl }: { apiUrl: string }) => {
  const { axiosAll } = useAxios();

  const getBudgetData = async () => {
    const budget = await axiosAll()
      .get(apiUrl)
      .then((budgetData) => {
        return budgetData;
      });
    return budget.data.data;
  };

  // Queries
  const { data } = useQuery(apiUrl, getBudgetData, {
    // todo: When there is an edit and view form built, reassess these options.
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <Grid container spacing={2} sx={{ marginTop: "5%" }}>
      {!data ? (
        <Loader />
      ) : (
        data.map((budget: IBudget, index: number) => {
          const rows: IStandardRow[] = [
            {
              "Total Hours": budget.total_hours,
              "Total Fees": budget.total_fees,
              "Total Expenses": budget.total_expenses,
              Total: budget.total_fees + budget.total_expenses,
            },
            {
              "Hours Invoiced": budget.invoiced_hours,
              "Fees Invoiced": budget.invoiced_fees,
              "Expenses Invoiced": budget.invoiced_expenses,
              Total: budget.invoiced_fees + budget.invoiced_expenses,
            },
            {
              "Remaining Hours": budget.remaining_hours,
              "Remaining Fees": budget.remaining_fees,
              "Remaining Expenses": budget.remaining_expenses,
              Total: budget.remaining_fees + budget.remaining_expenses,
            },
          ];
          return <GDXList key={index} data={rows} title={`Fiscal ${budget.fiscal_year}`} />;
        })
      )}
    </Grid>
  );
};

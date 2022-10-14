import { Box, Grid } from "@mui/material";
import { GDXList } from "components/GDXList";
import { Loader } from "components/Loader";
import { useAxios } from "hooks/useAxios";
import React from "react";
import { useQuery } from "react-query";

export const BudgetDisplay = ({ apiUrl }: { apiUrl: string }) => {
  const { axiosAll } = useAxios();

  const getBudgetData = async () => {
    const budget = await axiosAll()
      .get(apiUrl)
      .then((budgetData: any) => {
        return budgetData;
      });
    return budget.data.data;
  };

  // Queries
  const { data, isLoading } = useQuery("contract budget", getBudgetData, {
    // todo: When there is an edit and view form built, reassess these options.
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <Grid container spacing={2}>
      {!data ? (
        <Loader />
      ) : (
        data.map((budget: any) => {
          return <GDXList data={budget} title={`Fiscal ${budget.fiscal_year}`} />;
        })
      )}
    </Grid>
  );
};
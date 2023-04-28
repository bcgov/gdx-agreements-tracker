import React from "react";
import { useAxios } from "hooks/useAxios";
import { useQuery, UseQueryResult } from "react-query";
import { useKeycloak } from "@react-keycloak/web";
import { FormikValues } from "formik";

interface IGetFormData {
  url: string;
  tableName: string;
  lockedRow: string;
}

export const useFormData = ({ url, tableName }: IGetFormData) => {
  const { axiosAll } = useAxios();
  const getProject = async () => {
    const results = await axiosAll().get(url);
    results.data.table = tableName;
    return results;
  };

  const query = useQuery(url, getProject, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return query;
};

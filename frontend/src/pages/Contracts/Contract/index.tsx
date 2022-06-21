import { TextField } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { apiAxios } from "../../../utils";

export const Contract = () => {
  const { contractId } = useParams();

  const getContract = async () => {
    const contract = await apiAxios().get(`contract/${contractId}`);
    return contract;
  };

  // Queries
  const query = useQuery(`contract - ${contractId}`, getContract);

  return (
    <>
      {true === query.isLoading ? (
        <div>Loading</div>
      ) : (
        Object.entries(query.data?.data).map(([key, value]) => {
          return (
            <div key={key}>
              <br />
              <TextField disabled label={key} defaultValue={value} />
              <br />
            </div>
          );
        })
      )}
      <Outlet />
    </>
  );
};

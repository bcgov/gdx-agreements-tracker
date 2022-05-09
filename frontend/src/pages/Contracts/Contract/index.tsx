import React from "react";
import { useParams } from "react-router-dom";
import { DetailsList } from "../../../components";

export const Contract = () => {
  const { contractId } = useParams();

  return (
    <>
      <DetailsList id={contractId} title={"contract"} />
    </>
  );
};

import React from "react";
import { useParams } from "react-router-dom";
import { DetailsList } from "../../../components";

export const Contract = () => {
  let { contractId } = useParams();

  return (
    <>
      <DetailsList id={contractId} title={"contract"} />
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GDXAccordion } from "../../../../components/GDXAccordion";
import { apiAxios } from "../../../../utils";
import { ContractDetailsSection } from "./ContractDetailsSection";
import { InvoiceSection } from "./InvoiceSection";

export const ContractDetails = () => {
  const { contractId } = useParams();
  const [userHasEditCapability, setEditCapability] = useState(false);

  const getContract = async () => {
    const contract = await apiAxios().get(`contracts/${contractId}`);
    contract.data.data.notes = contract.data.data.notes ?? "";
    contract.data.data.description = contract.data.data.description ?? "";
    return contract.data;
  };

  /**
   * @todo Define a good type. "Any" type temporarily permitted.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contractQuery: any = useQuery(`contract - ${contractId}`, getContract, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    const user = contractQuery?.data?.user;
    setEditCapability(user && user.capabilities.includes("contracts_update_one"));
  }, [contractQuery]);

  return (
    <>
      <GDXAccordion sectionTitle="Contract Details">
        <ContractDetailsSection
          query={contractQuery}
          userHasEditCapability={userHasEditCapability}
        />
      </GDXAccordion>
      <GDXAccordion sectionTitle="Invoice Processing">
        <InvoiceSection />
      </GDXAccordion>
    </>
  );
};

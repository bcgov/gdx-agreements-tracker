import { BudgetDisplay } from "components/BudgetDisplay";
import React from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IChipNav } from "types";
import { ChipNav } from "../../../components/GDXForm/ChipNav";

/**
 * This reusable component renders the contracts component
 *
 * @param   {object}             query React query that contains all contracts
 * @returns {React.ReactElement}       The contract component
 */

export const Contract = () => {
  const { contractId } = useParams();

  const chipNavLinks: IChipNav[] = [
    {
      key: 0,
      name: "Contract Details",
      url: `/contracts/${contractId}`,
    },
    {
      key: 1,
      name: "Deliverables",
      url: `/contracts/${contractId}/deliverables`,
    },
    {
      key: 2,
      name: "Resources",
      url: `/contracts/${contractId}/resources`,
    },
    {
      key: 3,
      name: "Invoice Processing",
      url: `/contracts/${contractId}/invoice-processing`,
    },
    {
      key: 5,
      name: "Amendments",
      url: `/contracts/${contractId}/amendments`,
    },
  ];

  return (
    <>
      {"new" !== contractId && <ChipNav navLinks={chipNavLinks} />}
      <Outlet />
      <BudgetDisplay apiUrl={"/contracts/1609/budgets"} />
    </>
  );
};

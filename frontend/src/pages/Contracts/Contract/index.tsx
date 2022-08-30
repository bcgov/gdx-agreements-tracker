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
      name: "Amendments",
      url: `/contracts/${contractId}/amendments`,
    },
  ];

  return (
    <>
      <ChipNav navLinks={chipNavLinks} />
      <Outlet />
    </>
  );
};

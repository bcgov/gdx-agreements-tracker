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
  const { id } = useParams();

  const chipNavLinks: IChipNav[] = [
    {
      key: 0,
      name: "Contract Details",
      url: `/contracts/${id}`,
    },
    {
      key: 1,
      name: "Deliverables",
      url: `/contracts/${id}/deliverables`,
    },
    {
      key: 2,
      name: "Invoice Processing",
      url: `/contracts/${id}/invoice-processing`,
    },
    {
      key: 3,
      name: "Amendments",
      url: `/contracts/${id}/amendments`,
    },
    
  ];

  return (
    <>
      {"new" !== id && <ChipNav navLinks={chipNavLinks} />}
      <Outlet />
    </>
  );
};

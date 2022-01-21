import React, { FC } from "react";
import "./sideBar.scss";
import ButtonNav from "../ButtonNav";

interface Props {
  state?: Object;
}

export const Sidebar: FC<Props> = ({ state }) => {
  return (
    <aside>
      <section className="nav-section">
        <h2>GDX Agreements Tracker</h2>
        <nav>
          <ButtonNav to={`/project`}>Project List</ButtonNav>
          <ButtonNav to={`/project/34`}>Project Item Sample</ButtonNav>
          <ButtonNav to={`/contract`}>Contract List</ButtonNav>
          <ButtonNav to={`/contract/34`}>Contract Item Sample</ButtonNav>
          <ButtonNav to={`/reports`}>Reports</ButtonNav>
          <ButtonNav to={`/admin`}>Administration Forms</ButtonNav>
        </nav>
      </section>
      <img src="/gov_bc_logo.svg" alt="BC government logo" />
    </aside>
  );
};

export default Sidebar;

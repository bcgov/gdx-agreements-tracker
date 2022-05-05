import React, { FC, useState, useEffect, SyntheticEvent } from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { RowEditDeleteChip } from "../../../components";
import { IUser } from "../../../types";
import { apiAxios } from "../../../utils";

import "./users.scss";

export const Users: FC = () => {
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>();
  const [userEditChipRowLocation, setUserEditChipRowLocation] = useState<number>(-1);

  const handleSubmitSearch = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowMouseEnter = (e: any) => {
    setUserEditChipRowLocation(e.target?.parentElement.id);
  };

  const handlerowMouseLeave = () => {
    setUserEditChipRowLocation(-1);
  };

  useEffect(() => {
    const axiosResponse = apiAxios();
    axiosResponse
      .get("users")
      /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
      // todo: Define a good type. "Any" type temporarily permitted.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) => {
        setUserData(data);
      })
      /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
      // todo: Define a good type. "Any" type temporarily permitted.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="users">
      <h1>User Management</h1>
      <div>
        <div className="table-data-filter">
          <form className="filter-form user-search-form" onSubmit={handleSubmitSearch}>
            <label className="user-search-label" htmlFor="user-search-input">
              Search
            </label>
            <input type="text" id="user-search-input"></input>
            <button type="submit">Search</button>
          </form>
          <form className="filter-form user-filter-form">
            <label htmlFor="user-filter-select">Filter by role</label>
            <select id="user-filter-select" className="user-filter">
              <option>Unassigned</option>
              <option>PMO/FIN staff</option>
              <option>PROJ/CONT staff</option>
              <option>GDX all</option>
            </select>
          </form>
        </div>
        <TableContainer className="user-table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="user-table-head">
              <TableRow>
                <TableCell className="head-cell">User ID</TableCell>
                <TableCell className="head-cell">User role</TableCell>
                <TableCell className="head-cell"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="user-table-body">
              {userData &&
                userData.data.map(
                  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
                  // todo: Define a good type. "Any" type temporarily permitted.
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (user: IUser, i: any) => (
                    <TableRow
                      hover
                      id={i}
                      key={user.id}
                      className="table-body-row"
                      onMouseEnter={handleRowMouseEnter}
                      onMouseLeave={handlerowMouseLeave}
                    >
                      <TableCell className="body-cell" component="th" scope="row">
                        {user.email}
                      </TableCell>
                      <TableCell className="body-cell" align="left">
                        {user?.roles}
                      </TableCell>
                      <TableCell className="body-cell" align="right">
                        {i === userEditChipRowLocation && (
                          <RowEditDeleteChip
                            editCallback={() => undefined}
                            deleteCallback={() => undefined}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="user-role-totals">
          <span>Unassigned: 1</span>
          <span>PMO/FIN staff: 1</span>
          <span>PROJ/CONT staff: 1</span>
          <span>GDX all: 2</span>
        </div>
      </div>
    </div>
  );
};

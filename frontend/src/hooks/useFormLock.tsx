import { useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { useKeycloak } from "@react-keycloak/web";
import { UseQueryResult } from "@tanstack/react-query";
import { IDBRowlock } from "types";

export const useFormLock = () => {
  const { axiosAll } = useAxios();

  const { keycloak } = useKeycloak();

  /**
   * This function removes a lock on a database row using the provided lock information.
   *
   * @param              lockInfo                - `lockInfo` is an object that contains information about a database lock. It has
   *                                             the following properties:
   * @param {Array}      lockInfo.locked_row_ids - `locked_row_ids` is the DBlock table row id of the row associated to the current lock.
   * @param {Date}       lockInfo.locked_date    - `locked_date`   is the date the current lock was applied.
   * @param {string}     lockInfo.locked_table   - `locked_table`  is the the db table where the current lock's, locked_row_ids exists.
   * @param {string}     lockInfo.locked_by      - `locked_by`     is the user who has the current item locked
   * @param {IDBRowlock} row                     - The `row` parameter is an object that contains data related to a database row.
   *                                             It is used in the `handleDbLock` function to determine which row to lock and which table it belongs to.
   * @param {number[]}   rowsToLock              - The `rowToLock` parameter is a string that represents the
   *                                             ID of the row that needs to be locked in the database.
   */
  const removeLock = async (row: IDBRowlock, rowsToLock: number[]) => {
    await axiosAll().post(`db_lock/delete`, {
      params: {
        locked_row_ids: rowsToLock,
        locked_table: row.data.data.table,
        locked_by: keycloak?.idTokenParsed?.email,
      },
    });
  };

  /**
   * This function handles locking and unlocking of database rows for editing.
   *
   * @param {IDBRowlock} row        - The `row` parameter is an object that contains data related to a database row.
   *                                It is used in the `handleDbLock` function to determine which row to lock and which table it belongs to.
   * @param {number[]}   rowsToLock - The `rowToLock` parameter is a string that represents the
   *                                ID of the row that needs to be locked in the database.
   */
  const handleDbLock = async (row: IDBRowlock, rowsToLock: number[]) => {
    return await axiosAll()
      //GET Function - Although this is using the post method, this will only retrieve data.  The reason is beacuse we need to pass params which can only be done from a POST not GET method.
      .post("db_lock/get", {
        params: {
          locked_row_ids: rowsToLock,
          locked_date: new Date() as unknown as string,
          locked_table: row.data.data.table,
          locked_by: keycloak?.idTokenParsed?.email,
        },
      })
      .then((returnedRow) => {
        return returnedRow.data;
      })
      .catch((err: string) => {
        console.error("error", err);
      });
  };

  return {
    handleDbLock,
    removeLock,
  };
};

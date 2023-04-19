import { useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { useKeycloak } from "@react-keycloak/web";

export const useFormLock = () => {
  const [formLock, setFormLock] = useState({
    locked: false,
    lockedBy: "",
    lockedTable: "",
    lockedDate: "",
    lockedRow: "",
  });

  const { axiosAll } = useAxios();

  const { keycloak } = useKeycloak();

  /**
   * This function removes a lock on a database row using the provided lock information.
   *
   * @param          lockInfo               - `lockInfo` is an object that contains information about a database lock. It has
   *                                        the following properties:
   * @param {number} lockInfo.locked_row_id - `locked_row_id` is the DBlock table row id of the row associated to the current lock.
   * @param {Date}   lockInfo.locked_date   - `locked_date`   is the date the current lock was applied.
   * @param {string} lockInfo.locked_table  - `locked_table`  is the the db table where the current lock's, locked_row_id exists.
   * @param {string} lockInfo.locked_by     - `locked_by`     is the user who has the current item locked
   */
  const removeLock = async (lockInfo: {
    locked_row_id: string;
    locked_date: string;
    locked_table: string;
    locked_by: string;
  }) => {
    await axiosAll().delete(`db_lock/${lockInfo.locked_row_id}`, { headers: lockInfo });
  };

  /**
   * This function handles locking and unlocking of database rows for editing.
   *
   * @param {any}                row       - The `row` parameter is an object that contains data related to a database row.
   *                                       It is used in the `handleDbLock` function to determine which row to lock and which table it belongs
   *                                       to.
   * @param {string | undefined} rowToLock - The `rowToLock` parameter is a string that represents the
   *                                       ID of the row that needs to be locked in the database.
   */
  // todo Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDbLock = async (row: any, rowToLock: string | undefined) => {
    const apiUrl = "db_lock";

    const formLocker = async () => {
      setFormLock({
        locked: true,
        lockedBy: keycloak?.idTokenParsed?.email,
        lockedTable: row.data.table,
        lockedDate: new Date() as unknown as string,
        lockedRow: rowToLock as string,
      });
      await axiosAll().post(apiUrl, {
        headers: {
          locked_row_id: rowToLock as string,
          locked_date: new Date() as unknown as string,
          locked_table: row.data.table,
          locked_by: keycloak?.idTokenParsed?.email,
        },
      });
    };

    await axiosAll()
      .get(apiUrl, {
        headers: {
          locked_date: new Date() as unknown as string,
          locked_table: row.data.table,
          locked_by: keycloak?.idTokenParsed?.email,
        },
      })
      .then(async (returnedRow) => {
        if (!returnedRow) {
          await formLocker();
        } else {
          if (keycloak?.idTokenParsed?.email === returnedRow.data.data.locked_by) {
            return;
          } else {
            const response = confirm(
              `Would you like to take over editing from ${returnedRow.data.data.locked_by}`
            );
            if (response) {
              await removeLock(row.data.dbRowLock.lockId).then(() => {
                formLocker();
              });
            }
            return;
          }
        }
      })
      .catch((err: string) => {
        console.error("error", err);
      });
  };

  return {
    handleDbLock,
    formLock,
    removeLock,
  };
};

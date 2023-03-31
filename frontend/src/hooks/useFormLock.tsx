import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

export const useFormLock = () => {
  const [formLock, setFormLock] = useState({
    locked: false,
    lockedBy: "",
    lockedTable: "",
    lockedDate: "",
    lockedRow: "",
  });

  const { axiosAll } = useAxios();

  const lockRemover = async (lockInfo: {
    locked_row_id: string;
    locked_date: string;
    locked_table: string;
    locked_by: string;
  }) => {
    await axiosAll().delete(`db_lock/${lockInfo.locked_row_id}`, { headers: lockInfo });
  };
  // todo Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDbLock = async (row: any, rowToLock: string | undefined) => {
    const apiUrl = "db_lock";

    const formLocker = async () => {
      setFormLock({
        locked: true,
        lockedBy: row.data.user.email,
        lockedTable: row.data.table,
        lockedDate: new Date() as unknown as string,
        lockedRow: rowToLock as string,
      });
      await axiosAll().post(apiUrl, {
        headers: {
          locked_row_id: rowToLock as string,
          locked_date: new Date() as unknown as string,
          locked_table: row.data.table,
          locked_by: row.data.user.email,
        },
      });
    };

    await axiosAll()
      .get(apiUrl, {
        headers: {
          locked_date: new Date() as unknown as string,
          locked_table: row.data.table,
          locked_by: row.data.user.email,
        },
      })
      .then(async (returnedRow) => {
        if (!returnedRow) {
          await formLocker();
        } else {
          if (row.data.user.email === returnedRow.data.data.locked_by) {
            return;
          } else {
            const response = confirm(
              `Would you like to take over editing from ${returnedRow.data.data.locked_by}`
            );
            if (response) {
              await lockRemover(row.data.dbRowLock.lockId).then(() => {
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

  const checkDbLock = () => {};

  return {
    checkDbLock,
    handleDbLock,
    formLock,
    lockRemover,
  };
};

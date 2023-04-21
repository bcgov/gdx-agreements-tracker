import { DBLock } from "components/DBLock";
import { UseQueryResult } from "react-query";

/**
 * This function returns a render function that conditionally renders a component or a DBLock component
 * based on the lock status.
 *
 * @param                    lock             - an object that contains information about whether the database is currently locked and
 *                                            if the current user has the lock
 * @param   {boolean}        lock.locked      - `locked` is a boolean value indicating if the current item(row) is locked.
 * @param   {Function}       handleDbLock     - A function that handles the locking of a database resource.
 * @param   {boolean}        lock.currentUser - `currentUser` is a boolean value indicating if the current lock is applied to the current logged in user.
 * @param   {Function}       removeLock       - `removeLock` is a function that is used to remove the lock on a
 *                                            database resource. It is likely called when the user who has locked the resource is done with their
 *                                            work and wants to release the lock for others to use.
 * @param   {UseQueryResult} query            - The query parameter is of type UseQueryResult, which is likely an
 *                                            object returned by a hook like useQuery from a library like React Query. It likely contains data and
 *                                            metadata related to a query made to a database or API.
 * @param   {Function}       handleEditMode   - handleEditMode is a function that is used as a parameter in the
 *                                            useDBLockRender hook. It is likely used to handle the editing mode of a component or page.
 * @returns {JSX.Element}                     An array containing the `renderDBLock` function.
 */
const useDBLockRender = (
  lock: { locked: boolean; currentUser: boolean },
  handleDbLock: Function,
  removeLock: Function,
  query: UseQueryResult
) => {
  const renderDBLock = (component: Function) => {
    if (lock.locked) {
      if (lock.currentUser) {
        return component();
      } else {
        return (
          <DBLock
            handleDbLock={handleDbLock}
            removeLock={removeLock}
            query={query}
            handleFormType={() => {}}
          />
        );
      }
    } else {
      return component();
    }
  };

  return [renderDBLock];
};

export default useDBLockRender;

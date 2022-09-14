import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import { ICurrentUser } from "types";
import { apiAxios } from "utils";

const useAuthorization = (keycloak: { authenticated: boolean; tokenParsed: { email: string } }) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

  const handleCurrentUser = async () => {
    if (keycloak.authenticated) {
      if (!currentUser) {
        await apiAxios()
          .post(`users/email`, { email: keycloak.tokenParsed.email })
          .then((user) => {
            setCurrentUser(user.data.data);
            return user.data.data;
          })
          .catch((err) => {
            console.error("error:", err);
          });
      }
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, [useKeycloak().initialized]);

  //TODO For Later use
  // const [currentUser, setCurrentUser] = useState(undefined);

  // const handleCurrentUser = async () => {
  //   const currentUser = await apiAxios()
  //     .post(`users/email`, { email: keycloak.tokenParsed.email })
  //     .then((user) => {
  //       return user.data.data;
  //     })
  //     .catch((err) => {
  //       console.error("error:", err);
  //     });

  //   return currentUser;
  // };

  // const currentUser = useQuery("currentUser", handleCurrentUser);

  return { currentUser };
};

export default useAuthorization;

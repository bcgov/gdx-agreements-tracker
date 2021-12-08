import { FC, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

interface IUserInfo {
    displayName?: string;
    username: string;
    name?: string;
    preferred_username?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    groups: string[];
    roles: string[];
    given_name?: string;
    family_name?: string;
    agencies: number[];
  }

const Header: FC = () => {
    let userInfo: IUserInfo;
    const { initialized, keycloak } = useKeycloak();

    useEffect(() => {
        
    });

    return (
        <header></header>
    )
}

export default Header;
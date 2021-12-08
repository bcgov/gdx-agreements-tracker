import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Loading from '../components/Loading';

interface Props {
    component: FC
}

const ProtectedRoute: FC<Props> = ({component: Component}) => {
    const { initialized, keycloak } = useKeycloak();
    const location = useLocation();

    if ( initialized ) {
        return (!!keycloak?.authenticated) ? <Component /> : <Navigate to={`/login?redirect=${location.pathname}`} />
    } else {
        return <Loading />;
    }

}

export default ProtectedRoute;
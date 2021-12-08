import { FC } from 'react';
import './index.scss';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';

const Home: FC = () => {

  return (
        <>
            <Sidebar state={{}} />
            <Main>
              Welcome home
            </Main>
        </>
  )
}
export default Home
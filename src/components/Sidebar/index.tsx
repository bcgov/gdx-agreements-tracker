import { FC } from 'react';
import './index.scss';
import ButtonNav from '../ButtonNav';

interface Props {
    state: Object
}

const Sidebar: FC<Props> = ({state}) => {
    return (
        <aside>
            <section className="nav-section">
                <h2>GDX Agreements Tracker</h2>
                <nav>
                    <ButtonNav to={`/project/list`} >Project List</ButtonNav>
                    <ButtonNav to={`/project/34/details`} >Project Item Sample</ButtonNav>
                    <ButtonNav to={`/contract/list`} >Contract List</ButtonNav>
                    <ButtonNav to={`/contract/34/details`} >Contract Item Sample</ButtonNav>
                    <ButtonNav to={`/reports`} >Reports</ButtonNav>
                    <ButtonNav to={`/admin`} >Administration Forms</ButtonNav>
                </nav>
            </section>
            <img src="/gov_bc_logo.svg" alt="BC government logo"/>
        </aside>
    )
}

export default Sidebar;
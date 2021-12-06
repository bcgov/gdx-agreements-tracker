import React from 'react';
import { Routes, Route } from "react-router-dom";
import '@bcgov/bc-sans/css/BCSans.css';
import './styles/App.scss';
import ProjectRoutes from './Project/routes';
import ContractRoutes from './Contract/routes';
import AdminRoutes from './Admin/routes';
import ButtonNav from './components/ButtonNav';


function App() {
  return (
    <div className="pmo-app default-theme">
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
        <section className="main-section">
            <header></header>
            <main>
                <Routes>
                    <Route path="/" element={<h2>Home</h2>} />
                    {ProjectRoutes}
                    {ContractRoutes}
                    {AdminRoutes}
                    <Route path="reports" element={<h2>Reports</h2>} />
                    <Route path="*" element={<h2>Error no route</h2>} />
                </Routes>
            </main>
            <footer></footer>
        </section>
    </div>
  );
}

export default App;

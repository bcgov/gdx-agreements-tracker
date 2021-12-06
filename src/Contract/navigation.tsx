import React from 'react';
import { useParams } from "react-router-dom";
import ButtonNav from '../components/ButtonNav';

/**
 * The Sub navigation for contracts.
 *
 * @returns 
 */
const Navigation = () => {
    let { contractId } = useParams<any>();
    return (
        <nav className="subnav">
            <ButtonNav to={`/contracts/${contractId}/details`} >Details</ButtonNav>
            <ButtonNav to={`/contracts/${contractId}/resources`} >Resources</ButtonNav>
            <ButtonNav to={`/contracts/${contractId}/deliverables`} >Deliverables</ButtonNav>
            <ButtonNav to={`/contracts/${contractId}/internal-coding`} >GDX Internal Coding</ButtonNav>
            <ButtonNav to={`/contracts/${contractId}/amendments`} >Amendments</ButtonNav>
        </nav>
    )
}

export default Navigation;
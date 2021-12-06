import React from 'react';
import { useParams } from "react-router-dom";
import ButtonNav from '../components/ButtonNav';

/**
 * The Sub navigation for projects.
 *
 * @returns 
 */
const Navigation = () => {
    let { projectId } = useParams<any>();
    return (
        <nav className="subnav" >
            <ButtonNav to={`/project/${projectId}/details`} >Details</ButtonNav>
            <ButtonNav to={`/project/${projectId}/status`} >Status</ButtonNav>
            <ButtonNav to={`/project/${projectId}/change-request`} >Change Request</ButtonNav>
            <ButtonNav to={`/project/${projectId}/billing`} >Billing</ButtonNav>
            <ButtonNav to={`/project/${projectId}/lessons-learned`} >Lessons Learned</ButtonNav>
            <ButtonNav to={`/project/${projectId}/close-out`} >Close Out</ButtonNav>
        </nav>
    )
}

export default Navigation;
import React from 'react';
import { useParams, Outlet } from "react-router-dom";
import Navigation from "./navigation";

export const Contract = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export const List = () => {
    return (
        <>
            <h2>Contract List</h2>
        </>
    )
}


export const Details = () => {
    let { contractId } = useParams()
    return (
        <>
            <Navigation />
            <h2>Contract Details {contractId}</h2>
            
        </>
    )
}

export const Resources = () => {
    let { contractId } = useParams()
    return (
        <>
            <Navigation />
            <h2>Resources {contractId} </h2>
        </>
    )
}

export const Deliverables = () => {
    let { contractId } = useParams()
    return (
        <>
            <Navigation />
            <h2>Deliverables {contractId}</h2>
        </>
    )
}

export const InternalCoding = () => {
    let { contractId } = useParams()
    return (
        <>
            <Navigation />
            <h2>Internal Coding {contractId}</h2>
        </>
    )
}

export const Amendments = () => {
    let { contractId } = useParams()
    return (
        <>
            <Navigation />
            <h2>Amendments {contractId}</h2>
        </>
    )
}

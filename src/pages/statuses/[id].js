import Layout from "@/components/layout";
import TicketTable from "@/components/ticketTable";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Show(){

    const router = useRouter();
    const {id} = router.query;
    // console.log(id);
    
    const [status,setStatus] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8000/api/statuses/${id}`,
        {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(result => {
        setStatus(result.data);
        })
        .catch(err => {
        console.log("Error Fetching Status:",err);
        })
    },[]);

    // console.log(status);
     const ticketByStatus = status.tickets;
    // console.log(ticketByStatus);


    return (
        <Layout>
            <TicketTable tickets={ticketByStatus} />
        </Layout>
    );
};



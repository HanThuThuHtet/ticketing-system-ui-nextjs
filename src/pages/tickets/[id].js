import Layout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Show(){

    const router = useRouter();
    const {id} = router.query;

    console.log(id);
    
    const [ticket,setTicket] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/api/tickets/${id}`,
        {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(result => {
        setTicket(result.data);
        })
        .catch(err => {
        console.log("Error Fetching Ticket:",err);
        })
    },[]);


    return (
        <Layout>
            <div>
                <div>
                    <h1>Ticket Details</h1>
                    <Link href='/tickets'>
                        Ticket Lists
                    </Link>
                </div>
                <p>ID: {ticket.id}</p>
                <p>Subject: {ticket.subject}</p>
                <p>Description: {ticket.description}</p>
                <p>Status: {ticket.status_id}</p>
                <p>Customer: {ticket.customer_id}</p>
                <button onClick={() => router.push(`/tickets/update/${ticket.id}`)}>Update Ticket</button>
            </div>
        </Layout>
    );
};



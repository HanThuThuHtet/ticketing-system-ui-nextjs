import Layout from "@/components/layout";
import TicketTable from "@/components/ticketTable";
import { Container, Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Show(){

    const router = useRouter();
    const {id} = router.query;
    const [status,setStatus] = useState([]);
    const [loading, setLoading] = useState(true);

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
        setLoading(false);
        })
        .catch(err => {
        console.log("Error Fetching Status:",err);
        setLoading(false);
        })
    },[id]);

    if(loading){
        return (
         <>
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Container className="mt-4">
            <Skeleton variant="rectangular" width="100%" height={500} />
          </Container>
         </>
        );
    }

    // console.log(status);
     const ticketByStatus = status.tickets;
    // console.log(ticketByStatus);


    return (
        <Layout>
            <TicketTable tickets={ticketByStatus} />
        </Layout>
    );
};



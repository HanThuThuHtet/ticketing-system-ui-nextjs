import Layout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TicketTable from "@/components/ticketTable";
import { Container, Skeleton } from "@mui/material";

export default function Index(){

  const router = useRouter();
  const [tickets,setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/tickets',
    {
      method: 'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      //console.log(result.data);
      setTickets(result.data);
      setLoading(false);
    })
    .catch(err => {
      console.log("Error Fetching Ticket:",err);
      setLoading(false);
    })
  },[]);
  
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

  return (
    <Layout>
      <div className="my-8">
        <TicketTable tickets={tickets}/>
        {/* <button onClick={() => router.push(`/tickets/create`)}>Create Ticket</button> */}
      </div>
    </Layout>
  );
}


// const token = localStorage.getItem('token');
  // const fetcher = (...args) =>fetch(...args).then((res) => res.json())
  // const {data:apiResponse , error} = useSWR('http://localhost:8080/api/tickets',fetcher)
  // if (error) return <div>Failed to Load</div>
  // if (!apiResponse) return <div>Loading...</div>
  // console.log(apiResponse);
  // const tickets = apiResponse.data || [];
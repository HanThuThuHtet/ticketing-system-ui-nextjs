import Layout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TicketTable from "@/components/ticketTable";



export default function Index(){

  const router = useRouter();
  const [tickets,setTickets] = useState([]);
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
    })
    .catch(err => {
      console.log("Error Fetching Ticket:",err);
    })
  },[]);
  

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
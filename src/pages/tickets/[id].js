import Layout from "@/components/layout";
import { Edit } from "@mui/icons-material";
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
        fetch(`http://localhost:8000/api/tickets/${id}`,
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

    const handleEdit = () => {
        router.push(`/tickets/update/${id}`);
    }

    return (
        <Layout>
            <div  className="mx-auto w-full max-w-2xl border rounded-md px-6 py-4 my-8">
                <div className="flex justify-end">
                    <Edit 
                        onClick={handleEdit}
                        variant="outlined"
                    />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-sky-500">
                    Ticket Details
                </h2>
                    <form  action="" method=""
                           className="space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <label htmlFor="id" className="text-sm font-medium leading-6 text-black-500">
                                Ticket ID
                            </label>
                            <input 
                                    type="text" id="id" name="id" value={ticket.id}  disabled
                                    className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                            />    
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="subject" className="text-sm font-medium leading-6 text-black-500">
                                Subject
                            </label>
                            <input
                                    type="text" id="subject" name="subject" value={ticket.subject}  disabled
                                    className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                            />    
                        </div>
        
                        <div className="flex items-center justify-between">
                            <label htmlFor="description"  className="text-sm font-medium leading-6 text-black-500">
                                Description
                            </label>
                            <input 
                                type="text" id="description" name="description" value={ticket.description} disabled
                                className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="status_id" className="text-sm font-medium leading-6 text-black-500">
                                Status
                            </label>
                            <input
                                type="text" id="status_id" name="status_id" value={ticket.status} disabled
                                className="w-2/3 capitalize rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="customer_id" className="text-sm font-medium leading-6 text-black-500">
                                Customer ID
                            </label>
                            <input 
                                type="text" id="customer_id" name="customer_id" value={ticket.customer_id} disabled
                                className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                        </div>
                    </form>    
            </div>

            {/* <div>
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
            </div> */}
        </Layout>
    );
};



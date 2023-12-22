import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Create(){
    
    const router = useRouter();
    const [ subject, setSubject ] = useState('');
    const [ description, setDescription ] = useState('');
    const [statusId,setStatusId] = useState('');
    const [customerId,setCustomerId] = useState('');

    const handleSubmit = async(e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();

        const headers = {
            'Authorization': `Bearer ${token}`,
            "Content-Type" : "multipart/form-data"
        }

        let data = new FormData();
        data.append('subject',subject);
        data.append('description',description);
        data.append('status_id',statusId);
        data.append('customer_id',customerId);

        let result = await axios({
            method: 'post',
            url: "http://localhost:8080/api/tickets",
            data: data,
            headers: headers
        });

        let response = result.data;
        console.log(response);

        if(response['success']){
            console.log("Ticket Created Successfully");
            const id = response.ticket.id;
            router.push(`/tickets/${id}`);
        }else{
            console.log("Failed to Create Ticket");
        }

    }

    return (
        <Layout>
            <div>
                <form onSubmit={(e) => handleSubmit(e)} action="" method="post">
                    <div>
                        <label>Subject</label>
                        <input onInput={(e) => setSubject(e.target.value)} type="text" id="subject" value={subject} />
                    </div>
                    <div>
                        <label>Description</label>
                        <input onInput={(e) => setDescription(e.target.value)} type="text" id="description" value={description} />
                    </div>
                    <div>
                        <label>Status_id</label>
                        <input onInput={(e) => setStatusId(e.target.value)} type="text" id="status_id" value={statusId} />
                    </div>
                    <div>
                        <label>Customer_id</label>
                        <input onInput={(e) => setCustomerId(e.target.value)} type="text" id="customer_id" value={customerId} />
                    </div>
                    <div>
                        <input type="submit" value="Create" />
                        {/* <button onClick={tickets}>Tickets</button> */}
                    </div>
                    
                </form>
            </div>
        </Layout>
    );
}



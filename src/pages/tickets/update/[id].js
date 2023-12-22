import Layout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";


export default function Update(){

    const router = useRouter();
    const {id} = router.query;
    console.log(id);

    const [ subject, setSubject ] = useState('');
    const [ description, setDescription ] = useState('');
    const [statusId,setStatusId] = useState('');
    const [customerId,setCustomerId] = useState('');
    
    const fetcher = async(url,headers) => {
        const token = localStorage.getItem('token');
        const response = await fetch(url,{
            headers : {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        
          return response.json();
    }

    const {data:ticket,error} = useSWR(`http://localhost:8080/api/tickets/${id}`,(url) => fetcher(url,{}));
    //console.log(ticket);
    
    useEffect(() => {
        if(ticket){
            setSubject(ticket.data.subject);
            setDescription(ticket.data.description);
            setStatusId(ticket.data.status_id);
            setCustomerId(ticket.data.customer_id);
        }
    },[ticket]);

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
      };
    
      const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
      };
    
      const handleStatusIdChange = (e) => {
        setStatusId(e.target.value);
      };
    
      const handleCustomerIdChange = (e) => {
        setCustomerId(e.target.value);
      };
    

    const handleSubmit = async(e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();

        const headers = {
            'Authorization': `Bearer ${token}`,
            "Content-Type" : "multipart/form-data"
        }

        const formData = {
            subject: subject,
            description: description,
            status_id: statusId,
            customer_id: customerId,
        };

        console.log(formData);

        // let data = new FormData();
        // data.append('subject',subject);
        // data.append('description',description);
        // data.append('status_id',statusId);
        // data.append('customer_id',customerId);

        // let result = await axios({
        //     method: 'PATCH',
        //     url: `http://localhost:8080/api/tickets/${id}`,
        //     // data: data,
        //     data: JSON.stringify(formData),
        //     headers: headers
        // });

        const result = await fetch(`http://localhost:8080/api/tickets/${id}`,{
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(formData)
        });
        const response = await result.json();
        console.log(response);


        if(response['success']){
            console.log("Ticket Updated Successfully");
            // console.log(response.ticket.id);
            const id = response.ticket.id;
            router.push(`/tickets/${id}`);
        }else{
            console.log("Failed to Update Ticket");
        }

    }

    

    return (
        <Layout>
            <div>
                <form onSubmit={(e) => handleSubmit(e)} action="" method="post">
                    <div>
                        <label>Subject</label>
                        <input onChange={handleSubjectChange} type="text" id="subject" name="subject" value={subject} className="text-black"/>
                    </div>
                    <div>
                        <label>Description</label>
                        <input onChange={handleDescriptionChange} type="text" id="description" name="description" value={description} className="text-black" />
                    </div>
                    <div>
                        <label>Status_id</label>
                        <input onChange={handleStatusIdChange} type="text" id="status_id" name="status_id" value={statusId} className="text-black" />
                    </div>
                    <div>
                        <label>Customer_id</label>
                        <input onChange={handleCustomerIdChange} type="text" id="customer_id" name="customer_id" value={customerId} className="text-black" />
                    </div>
                    <div>
                        <input type="submit" value="Update" />
                    </div>
                    
                </form>
            </div>
        </Layout>
    );
};



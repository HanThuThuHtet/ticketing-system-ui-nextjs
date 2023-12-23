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

        let data = new FormData();
        data.append('subject',subject);
        data.append('description',description);
        data.append('status_id',statusId);
        data.append('customer_id',customerId);

        let result = await axios({
            method: 'post',
            url: "http://localhost:8000/api/tickets",
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
            <div  className="mx-auto w-full max-w-2xl border rounded-md px-6 py-4 my-8">
                <h2 className="text-2xl font-bold mb-6 text-sky-500">
                    Create Ticket
                </h2>
                    <form  onSubmit={(e) => handleSubmit(e)} action="" method="post"
                         className="space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <label htmlFor="subject" className="text-sm font-medium leading-6 text-black-500">
                                Subject
                            </label>
                            <input onChange={handleSubjectChange}
                                    type="text" id="subject" name="subject" value={subject}  required
                                    className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-sky-300 sm:text-sm sm:leading-6"
                            />    
                        </div>
        
                        <div className="flex items-center justify-between">
                            <label htmlFor="description"  className="text-sm font-medium leading-6 text-black-500">
                                Description
                            </label>
                            <input onChange={handleDescriptionChange} 
                                type="text" id="description" name="description" value={description} required
                                className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-sky-300 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="status_id" className="text-sm font-medium leading-6 text-black-500">
                                Status_id
                            </label>
                            <input onChange={handleStatusIdChange} 
                                type="text" id="status_id" name="status_id" value={statusId} required
                                className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-sky-300 sm:text-sm sm:leading-6"  />
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="customer_id" className="text-sm font-medium leading-6 text-black-500">
                                Customer_id
                            </label>
                            <input onChange={handleCustomerIdChange} 
                                type="text" id="customer_id" name="customer_id" value={customerId} required
                                className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-sky-300 sm:text-sm sm:leading-6"    />
                        </div>

                        <div className="flex justify-end">
                            <input type="submit" value="Create"  
                                    className="rounded-md bg-sky-600 px-3 py-1.5 mt-8  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                            />
                        </div>
                        
                    </form>
                
            </div>
            {/* <div>
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
                        <button onClick={tickets}>Tickets</button>
                    </div>
                    
                </form>
            </div> */}
        </Layout>
    );
}



import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const  API_URL = "http://localhost:8000/api/";
const defaultTheme = createTheme();

export default function Login(){
    let [ email, setEmail ] = useState('');
    let [ password, setPassword ] = useState('');
    let token = null;
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const headers = {
            "Content-Type" : "multipart/form-data"
        }

        let data = new FormData();
        data.append('email',email);
        data.append('password',password);

        let result = await axios({
            method: 'post',
            url: 'login',
            baseURL: API_URL,
            data: data,
            headers: headers
        });

        let response = result.data;
        console.log(response);

        if(response['success']){
            console.log("Login success");
            token = response['token'];
            console.log(token);
            localStorage.setItem('token',token);
            localStorage.setItem('auth',JSON.stringify(response["auth"]));
            axios.defaults.headers.common['Authorization']  = "Bearer "+localStorage.getItem('token');
            router.push('/tickets');
        }else{
            console.log("Login failed");
            router.push('/user');
        }

    }

    // const tickets = async() => {
    //     if(token){
    //         const headers = {
    //             "Authorization": `Bearer ${token}`
    //         };

    //         let result = await axios({
    //             method: 'get',
    //             url: 'tickets',
    //             baseURL: API_URL,
    //             data: JSON.stringify({}),
    //             headers: headers
    //         });

    //         let response = result.data;

    //         console.log("Tickets",response);
    //     }else{
    //         console.log("Ticket is empty");
    //     }
    // }

    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-48 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm border  rounded-md px-6 py-4">
            
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-500">
                    Log in to your account
                </h2>
                

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)} action="" method="post">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-black-500">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input onInput={(e) => setEmail(e.target.value)} 
                                    type="email" id="email" value={email} required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-black-500">
                            Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input onInput={(e) => setPassword(e.target.value)} 
                                    type="password" id="password" value={password} required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <input type="submit" value="Login"  
                                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 mt-8  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                        />
                        <p className="text-center my-4">
                            Not a member? 
                            <Link href="/signup" variant="body2">
                            {" Sign Up"}
                            </Link>
                        </p>
                    </div>
                </form>
                </div>
                </div>
            </div>
        </>
    )
}





{/* <div>
                <form onSubmit={(e) => handleSubmit(e)} action="" method="post">
                    <div>
                        <label>Email</label>
                        <input onInput={(e) => setEmail(e.target.value)} type="email" id="email" value={email} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input onInput={(e) => setPassword(e.target.value)} type="password" id="password" value={password} />
                    </div>
                    <div>
                        <input type="submit" value="Login" />
                        
                    </div>
                    <button onClick={tickets}>Tickets</button>
                </form>
</div> */}
import { useState } from "react";
import InputBox from "../components/inputBox";
import {SigninInput} from "@hardikdudeja/thoughthub-common";
import { Link } from "react-router-dom";
import { SIGNIN_ENDPOINT } from "../config";
import axios from "axios";


function Signin() {
    const [signinInput, setSigninInput] = useState<SigninInput>({
        userName: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        try {
            const response = await axios.post(SIGNIN_ENDPOINT, signinInput);
            console.log("printing response", response);
            localStorage.setItem('authToken', response.data.token);
        } catch (error) {
            alert("user not found")
        }
       
      };

    
    return (
        <div className="bg-gray-700 h-screen flex">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <h3 className="font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Sign in dude!
                </h3>
                <div className="text-muted-foreground">
                  Continue sharing your passion with our vibrant community of writers and readers.
                </div>
            </div>
            <div className="w-1/2 p-4 flex items-center">
                <form action="" className="w-full" onSubmit={handleSubmit}>
                    <InputBox label="Email" placeHolder="h@h.com" onChange={(e) => {
                        setSigninInput({
                            ...signinInput,
                            userName: e.target.value
                        })
                    }}/>
                    <InputBox label="Password" placeHolder="***" type="password" onChange={(e) => {
                        setSigninInput({
                            ...signinInput,
                            password: e.target.value
                        })
                    }}/>
                    <button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign In</button>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Not registered yet? <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-500">Create account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin;
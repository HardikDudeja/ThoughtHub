import { useState } from "react";
import InputBox from "../components/inputBox";
import {SigninInput} from "@hardikdudeja/thoughthub-common";


function Signin() {
    const [signinInput, setSigninInput] = useState<SigninInput>({
        userName: "",
        password: ""
    });
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
            <div>
                <form action="">
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
                </form>
            </div>
        </div>
    )
}

export default Signin;
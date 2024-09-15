import { useState } from "react";

function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload
        console.log('Email:', email);
        console.log('Password:', password);
    
        // Perform sign-in logic (e.g., API call)
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
            <div>
                <div className="bg-black">
                    <h3>Sign In</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium">Email</label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                value={email}
                                required
                                className= "w-full bg-transparent border-2 rounded border-gray-500 placeholder:text-gray-400"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium">password</label>
                            <input
                                id="password"
                                type="text"
                                name="password"
                                value={password}
                                required
                                className= "w-full bg-transparent border-2 rounded border-gray-500 placeholder:text-gray-400"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signin;
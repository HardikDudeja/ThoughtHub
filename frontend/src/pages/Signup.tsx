import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom"

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "", 
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log("printing", name, value);
        
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    setFormData({
        name: "", 
        email: "", 
        password: ""
    });
    
    }

    return (
        <div className="bg-gray-700 h-screen flex">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Join our blogging community
                </h1>
                <p className="text-muted-foreground">
                  Discover and share your passion with our vibrant community of writers and readers.
                </p>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                <div className="bg-black p-24 rounded-md">
                    <h1>Create your account</h1>
                    <p>
                        Or {}
                        <Link className="hover:underline" to="/signin">sign in to your existing account</Link>
                    </p>
                    <div className="mt-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    required
                                    className= "w-full bg-transparent border-2 rounded border-gray-500 placeholder:text-gray-400"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    required
                                    className= "w-full bg-transparent border-2 rounded border-gray-500 placeholder:text-gray-400"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                <input
                                    id="password"
                                    type="text"
                                    name="password"
                                    value={formData.password}
                                    required
                                    className= "w-full bg-transparent border-2 rounded border-gray-500 placeholder:text-gray-400"
                                    onChange={handleChange}
                                />
                            </div>

                            <button className="w-full rounded bg-white text-black" type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
                

               
            </div>
        </div>
    )
}

export default Signup;
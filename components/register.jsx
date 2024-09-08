"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");

    const router=useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !email || !password) {
          setError("All fields are necessary.");
          return;
        }
        
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }


          const res=await fetch('api/register',{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
        if (res.ok) {
          const form = e.target;
          form.reset();
          router.push("/");
        } else {
          console.log("User registration failed.");
        }
      }catch(error){
        console.log("Error during registration: ", error);
        }
    }    

  return (
    <div className="container mx-auto p-36">
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter userName" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input  onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="Enter password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600">Register</button>
            { error&&(
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 ">
                {error}
            </div>
            )
            
            }
            
          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
    </div>
</div>
  )
}

export default RegisterForm
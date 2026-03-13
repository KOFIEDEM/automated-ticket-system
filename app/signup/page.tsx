'use client'

import { useState } from "react";
import { User } from 'lucide-react';

export default function SignupPage() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phone, setPhone] = useState("")

  return (

    <div className="min-h-screen flex items-center justify-center bg-contain"
    style={{ backgroundImage: "url('/train-station.jpg')" }}>

      <div className="bg-orange-50 p-8 rounded-2xl shadow-lg w-[400px]">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center font-bold  mb-6 mx-auto">
                <User size={50} className='text-orange-400'/>
              </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Create a RailPass Account
        </h1>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
              type="phone"
              placeholder="Phone Number"
              className="w-full border p-3 rounded-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="w-full bg-orange-400 hover:bg-orange-300 text-white p-3 rounded-lg">
            Sign Up
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <a href="/login" className="text-orange-400 ml-1">
            Login
          </a>
        </p>

      </div>

    </div>
  )
}
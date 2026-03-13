'use client'

import { useState } from "react";
import { User } from 'lucide-react';

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (

    <div className="min-h-screen flex items-center justify-center bg-contain"
    style={{ backgroundImage: "url('/train-station.jpg')" }}>

      <div className="bg-orange-50 p-8 rounded-2xl shadow-lg w-[400px]">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center font-bold  mb-6 mx-auto">
                <User size={50} className='text-orange-400'/>
              </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Login to RailPass
        </h1>

        <form className="space-y-4">

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

          <button className="w-full bg-orange-400 text-white p-3 rounded-lg hover:bg-orange-300 transition">
            Login
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account? 
          <a href="/signup" className="text-orange-400 ml-1">
            Sign Up
          </a>
        </p>

      </div>

    </div>
  )
}
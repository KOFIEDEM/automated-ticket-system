'use client'

import { useState } from "react"
import { User } from 'lucide-react'
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function SignupPage() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phone,setPhone] = useState("")
  const router = useRouter()

  const handleSignup = async (e: any) => {

    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
          phone: phone
        }
      }
    })

    if(error){
      alert(error.message)
    } else {
      router.push("/login")
    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-contain"
    style={{ backgroundImage: "url('/train-station.jpg')" }}>

      <div className="bg-orange-50 p-8 rounded-2xl shadow-lg w-[400px]">

        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 mx-auto">
          <User size={50} className='text-orange-400'/>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Create a RailPass Account
        </h1>

        <form className="space-y-4" onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
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

      </div>

    </div>
  )
}
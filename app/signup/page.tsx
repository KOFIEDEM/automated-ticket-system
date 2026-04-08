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

    const { error } = await supabase.auth.signUp({
      email,
      password,
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

    <div
      className="min-h-screen flex items-center justify-center px-4 py-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/train-station.jpg')" }}
    >

      <div className="bg-orange-50 w-full max-w-md p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg">

        {/* Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center mb-5 sm:mb-6 mx-auto">
          <User size={40} className='text-orange-400'/>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-5 sm:mb-6">
          Create a RailPass Account
        </h1>

        {/* Form */}
        <form className="space-y-3 sm:space-y-4" onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2.5 sm:p-3 rounded-lg text-sm sm:text-base"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-2.5 sm:p-3 rounded-lg text-sm sm:text-base"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2.5 sm:p-3 rounded-lg text-sm sm:text-base"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2.5 sm:p-3 rounded-lg text-sm sm:text-base"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="w-full bg-orange-400 hover:bg-orange-300 text-white p-2.5 sm:p-3 rounded-lg text-sm sm:text-base transition">
            Sign Up
          </button>

        </form>

      </div>

    </div>
  )
}
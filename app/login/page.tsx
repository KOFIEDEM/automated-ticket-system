'use client'

import { useState } from "react"
import { User } from 'lucide-react'
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e:any) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      alert(error.message)
    } else {
      router.push("/dashboard")
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
          Login to RailPass
        </h1>

        {/* Form */}
        <form className="space-y-3 sm:space-y-4" onSubmit={handleLogin}>

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

          <button className="w-full bg-orange-400 text-white p-2.5 sm:p-3 rounded-lg hover:bg-orange-300 transition text-sm sm:text-base">
            Login
          </button>

        </form>

      </div>

    </div>
  )
}
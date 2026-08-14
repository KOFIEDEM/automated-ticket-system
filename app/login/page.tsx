'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Mail, Lock, LogIn } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setErrorMessage('')

    if (!email || !password) {
      setErrorMessage(
        'Please enter your email and password.'
      )
      return
    }

    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-8"
      style={{
        backgroundImage: "url('/train-station.jpg')",
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/30 bg-orange-50/95 shadow-2xl backdrop-blur-xl">
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-7 text-center text-white">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <User size={38} />
          </div>

          <h1 className="mt-4 text-2xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-1 text-sm text-orange-100">
            Login to your RailPass account
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {errorMessage && (
            <div className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <form
            className="space-y-5"
            onSubmit={handleLogin}
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white p-3 pl-10 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white p-3 pl-10 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 p-3 font-semibold text-white shadow-lg transition hover:bg-orange-600 disabled:bg-gray-300"
            >
              <LogIn size={19} />

              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-orange-500 hover:text-orange-600"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
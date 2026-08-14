'use client'

import { useEffect, useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Camera,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    location: 'Accra, Ghana',
  })

  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      setUser({
        name: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        location:
          user.user_metadata?.location || 'Accra, Ghana',
      })

      setImage(user.user_metadata?.avatar_url || null)

      setLoading(false)
    }

    loadProfile()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    setImage(imageUrl)
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setSaving(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: user.name,
        phone: user.phone,
        location: user.location,
        avatar_url: image,
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Profile updated successfully.')
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
          Account
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-800">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your RailPass account information.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-white sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="relative">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="h-24 w-24 rounded-2xl border-4 border-white/30 object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                  <User size={42} />
                </div>
              )}

              <label className="absolute -bottom-2 -right-2 cursor-pointer rounded-xl bg-white p-2 text-orange-500 shadow-lg transition hover:bg-orange-50">
                <Camera size={17} />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">
                {user.name || 'RailPass User'}
              </h2>

              <p className="mt-1 text-sm text-orange-100">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User size={16} className="text-orange-500" />
                Full Name
              </label>

              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Mail size={16} className="text-orange-500" />
                Email
              </label>

              <input
                name="email"
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-500"
              />

              <p className="mt-1 text-xs text-gray-400">
                Email is managed by your authentication account.
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Phone size={16} className="text-orange-500" />
                Phone
              </label>

              <input
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                placeholder="+233..."
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin size={16} className="text-orange-500" />
                Location
              </label>

              <input
                name="location"
                value={user.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                placeholder="Accra, Ghana"
              />
            </div>
          </div>

          {message && (
            <div className="mt-5 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">
              {message}
            </div>
          )}

          <div className="mt-7 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600 disabled:bg-gray-300"
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
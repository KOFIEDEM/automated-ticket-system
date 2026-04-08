'use client'

import { useState } from 'react'
import { User } from 'lucide-react'

export default function ProfilePage() {

  const [user, setUser] = useState({
    name: "Kofi Edem",
    email: "kofi@example.com",
    phone: "+233 000 000 000",
    location: "Accra, Ghana"
  })

  const [image, setImage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated user:", user)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">

      <h1 className="text-xl sm:text-2xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-green-50 border border-orange-400 shadow rounded-lg p-4 sm:p-6">

        {/* Profile Header */}

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 text-center sm:text-left">

          {/* Avatar */}

          <div className="relative">

            {image ? (
              <img
                src={image}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center">
                <User size={40} className='text-orange-400'/>
              </div>
            )}

            {/* Upload Button */}

            <label className="absolute -bottom-2 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 text-orange-400 text-xs bg-white px-2 py-1 rounded cursor-pointer shadow">
              Edit
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

          </div>

          {/* User Info */}

          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              {user.name}
            </h2>

            <p className="text-gray-500 text-sm sm:text-base break-all">
              {user.email}
            </p>
          </div>

        </div>

        {/* Profile Form */}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >

          <div>
            <label className="text-sm text-gray-600">
              Full Name
            </label>

            <input
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Email
            </label>

            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Phone
            </label>

            <input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Location
            </label>

            <input
              name="location"
              value={user.location}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 text-sm sm:text-base"
            />
          </div>

          <div className="md:col-span-2">

            <button
              type="submit"
              className="w-full sm:w-auto bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-300 transition"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}
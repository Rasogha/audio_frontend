import { useState } from "react"
import { FaUserCircle } from "react-icons/fa"

export default function UserAvatar({ src }) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <FaUserCircle className="text-gray-400 text-2xl" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt="profile"
      className="w-10 h-10 rounded-full object-cover"
      onError={() => setError(true)}
    />
  )
}
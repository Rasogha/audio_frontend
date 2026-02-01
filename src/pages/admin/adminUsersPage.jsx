import axios from "axios"
import { useState, useEffect } from "react"
import { FaUserCircle } from "react-icons/fa"
import UserAvatar from "../../components/userAvatar"

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
    
   const fetchUsers = async () =>{
    try{
        const token = localStorage.getItem("token")
        const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
            {
               headers:{
                Authorization:`Bearer ${token}`
               }
            }
        )
        console.log(res.data)
        setUsers(res.data)
    }catch(error){
        console.log("Error fetching users:",error)
    }finally{
        setLoading(false)
    }
    
   }
    if(loading){
        fetchUsers()
    }
    
},[loading])

function handleBlockedUser(email){
    // const email = email
    const token = localStorage.getItem("token")

    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,{},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(()=>{
        setLoading(true)
    }).catch((err)=>{
        console.log(err)
    })
}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Users Management</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500">No users found</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <UserAvatar src={user.profilePicture} />
                    <div>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-gray-500 text-xs">
                        ID: {user._id.slice(-6)}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
                        ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">{user.phone}</td>

                  <td className="px-6 py-4 max-w-xs truncate">
                    {user.address}
                  </td>
                  <td onClick={()=>{handleBlockedUser(user.email)}}
                    className="px-6 py-4 hover:bg-red-500 rounded-2xl cursor-pointer">{user.isBlocked?"BLOCKED":"ACTIVE"}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

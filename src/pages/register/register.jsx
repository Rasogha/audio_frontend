import { useState } from "react"
import './register.css'
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const navigate = useNavigate()

    function handleOnSubmit(e) {
        e.preventDefault()
        console.log({ firstName, lastName, email, password, address, phone })
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        axios.post(`${backendUrl}/api/users/`, {
            email : email,
            firstName : firstName,
            lastName : lastName,
            password : password,
            address : address,
            phone : phone
        }).then(() => {
            toast.success("Registration Successful")
            navigate("/login")
        }).catch((err) => {
            toast.error(err?.response?.data?.error||"Registration failed")
        })
    }

    return (
        <div className="bg-picture w-full h-screen flex justify-center items-center">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[400px] h-[550px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col relative">
                    
                    <img
                        src='../../public/logo.png'
                        alt='logo'
                        className='w-[100px] h-[100px] absolute top-1 '
                    />

                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input_field"
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input_field"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input_field"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input_field"
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="input_field"
                    />

                    <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input_field"
                    />

                    <button className="my-8 w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg">
                        Register
                    </button>

                </div>
            </form>
        </div>
    )
}

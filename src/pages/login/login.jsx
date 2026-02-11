import axios from 'axios' //send data to backend
import './login.css'
import { useState } from "react"
import toast from 'react-hot-toast' //Alert displaying
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'

export default function LoginPage(){ // email and password is changing frequently
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin(
        {
            onSuccess : (res)=>{
                console.log(res)
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`,{
                    accessToken : res.access_token
                }).then((res)=>{
                    console.log(res)
                    toast.success("Login Success")
                    const user = res.data.user
                    localStorage.setItem("token",res.data.token)
                    if(user.role === "admin"){
                        navigate("/admin")
                    }else{
                        navigate("/")
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    )

    function handleOnSubmit(e){
        e.preventDefault() //stop the refreshing, can use Enter button
        console.log(email,password)
        const backendUrl = import.meta.env.VITE_BACKEND_URL

        axios.post( `${backendUrl}/api/users/login`,
            {
                email : email,
                password: password
            }).then((res)=>{
                console.log(res) //status code should be 200 nmbers to do this
                toast.success("Login Successfull") //alert
                const user = res.data.user
                localStorage.setItem("token",res.data.token)

                if(user.role === "admin"){
                    //window.location.href = "/admin/"  //this is a problem. because this refresh the page. so we use useNavigate
                    navigate("/admin")
                }else{
                    navigate("/")
                }

            }).catch((err)=>{
                console.log(err) // other all are for here
                toast.error(err.response.data.error)
            })
        
    }

    return (
    <div className="bg-picture w-full h-screen flex justify-center items-center">
        <form onSubmit={handleOnSubmit}>  
            <div className="w-[400px] h-[400px] backdrop-blur-xl ronded-2xl flex justify-center items-center flex-col relative">
                <img src='/logo.png.' alt='logo' className='w-[100px] h-[100px] absolute top-1'
                />
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-[300px] h-[30px] bg-transparent border-b-2 border-white mt-6 text-white text-xl outline-none'
                />

                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}className='w-[300px] h-[30px] bg-transparent border-b-2 border-white mt-6 text-white text-xl outline-none'
                />
                
                <button className='my-8 w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg cursor-pointer'>Login</button>
                <div className='my-8 w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg cursor-pointer' onClick={googleLogin}>Login with Google</div>

            </div>
        </form>
    </div>
    )
}
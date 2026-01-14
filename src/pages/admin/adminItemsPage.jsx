import axios from "axios"
import { useEffect, useState } from "react"
import { CiCirclePlus } from "react-icons/ci"
import { Link, useNavigate } from "react-router-dom"


export default function AdminItemsPage() {
    const [items, setItems] = useState([]) //data    this state two are the main states fot the table
    const [itemsLoaded, setItemsLoaded] = useState(false) // loaded or not,to run only the useEffect again
    const navigate = useNavigate() //use for navigatings\

    useEffect(() => {

        if(!itemsLoaded){    
            const token = localStorage.getItem("token")
            axios.get("http://localhost:3000/api/products", {
                headers: {
                    Authorization: "Bearer ${token}"
                }
            })
            .then((res) => {
                setItems(res.data)
                setItemsLoaded(true) //after data came to front become true
            })
            .catch((err) => {
                console.log(err)
            })

        }
        }, [itemsLoaded]) //if this value changed, useEffect will run again

    const handleDelete = (key) => {
        if(window.confirm("Are you want to delete")){
            setItems(items.filter((item)=>item.key !== key))
            const token = localStorage.getItem("token")
            axios.delete('http://localhost:3000/api/products/${key}', {
                headers: {
                    Authorization: 'Bearer ${token}'},
            })
            .then((res)=>{
                console.log(res.data)
                setItemsLoaded(false) 
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    return (
        <div className="w-full h-full p-6 relative flex flex-col items-center">
            {!itemsLoaded &&<div className="border-4 my-4 w-[100px] h-[100px] border-b-green-500 rounded-full animate-spin bg-0 "></div>}
                    {itemsLoaded &&<div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Key</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Price ($)</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Dimensions</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((product, index) => (
                                <tr
                                    key={product.key}
                                    className={`border-b hover:bg-gray-100 ${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    }`}
                                >
                                    <td className="px-4 py-2">{product.key}</td>
                                    <td className="px-4 py-2 font-medium">{product.name}</td>
                                    <td className="px-4 py-2">${product.price}</td>
                                    <td className="px-4 py-2 capitalize">{product.category}</td>
                                    <td className="px-4 py-2">{product.dimensions}</td>
                                    <td className="px-4 py-2">{product.description}</td>

                                    <td className="px-4 py-2 text-center space-x-2">
                                        <button 
                                        onClick={()=>{
                                            navigate('/admin/items/edit'),{state:product}        //bring data through pages
                                        }}className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(product.key)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>}

            <Link to="/admin/items/add">
                <CiCirclePlus className="text-[70px] absolute bottom-4 right-4 cursor-pointer text-green-600 hover:text-green-800" />
            </Link>
        </div>
    )
}

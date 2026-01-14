import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"

export default function UpdateItemsPage() {
    const location = useLocation()   // JSON file that bring data from other location


    const [productKey, setProductKey] = useState(location.state.key)
    const [productName, setProductName] = useState(location.state.name)
    const [productPrice, setProductPrice] = useState(location.state.price)
    const [productCategory, setProductCategory] = useState(location.state.category)
    const [productDimensions, setProductDimensions] = useState(location.state.dimensions)
    const [productDescription, setProductDescription] = useState(location.state.description)
    const [itemsLoaded, setItemsLoaded] = useState(false)

    const navigate = useNavigate()
    

    async function handleAddItem(){
        console.log(productKey,productName, productPrice, productCategory, productDimensions, productDescription)
        const token = localStorage.getItem("token")

        if(token){
        try{    
            const result = await axios.put("http://localhost:3000/api/products/"+productKey,
                {
                    key: productKey,
                    name: productName,
                    price: productPrice,
                    category: productCategory,
                    dimensions: productDimensions,
                    description: productDescription
                },{
                    headers : {
                        Authorization: "Bearer" + token
                    }
                })
           toast.success(result.response.meessage)
           navigate("/admin/items")

        } catch(err){
            toast.error(err.response.data.error)
        }

    }else{
        toast.error("You are not authorized")
    }
}
    return (
    <div className="w-full h-full p-6 relative flex flex-col items-center">
        {!itemsLoaded &&<div className="border-4 my-4 w-[100px] h-[100px] border-b-green-500 rounded-full animate-spin bg-0 "></div>}
            <div className="overflow-x-auto">
                <div className="bg-amber-600 w-[400px] flex flex-col items-stretch gap-3 p-4 rounded">
                
                <input
                    disabled
                    type="text"
                    placeholder="Product Key"
                    value={productKey}
                    onChange={(e) => setProductKey(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />

                <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                >
                    <option value="audio">Audio</option>
                    <option value="lights">Lights</option>
                </select>

                <input
                    type="text"
                    placeholder="Product Dimensions"
                    value={productDimensions}
                    onChange={(e) => setProductDimensions(e.target.value)}
                />

                <textarea
                    type="text"
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                />

                <button onClick={handleAddItem}
                        className="bg-black text-white px-4 py-2 rounded"
                >
                    Update Item
                </button>
                <button onClick={()=>{navigate("/admin/items")}}className="bg-red-900 text-white px-4 py-2 rounded">
                    Cancle
                </button>
            </div>
            
        </div>
    </div>)}
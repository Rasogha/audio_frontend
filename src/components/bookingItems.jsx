import axios from "axios"
import { useEffect, useState } from "react"
import { addToCart, loadCart, removeFromCart } from "../utils/cart"
import { FaTrash } from "react-icons/fa"

export default function BookingItem(props) {
    const {itemKey, qty, refresh} = props
    const [item, setItem] = useState(null)
    const [status, setStatus] = useState("loading") //loading, success, error

    useEffect(()=>{
        if(status == "loading"){
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            axios.get(`${backendUrl}/api/products/${itemKey}`).then((res)=>{
                setItem(res.data)
                setStatus("success")
                
            }).catch((err)=>{
                setStatus("error")
                console.log(err)
                removeFromCart(itemKey)
                refresh()
            })
        }
    },[status])

    if(status == "loading"){
        return <div className="text-red-500">Loading...</div>
    }

    if(status == "error"){
        return <div className="text-red-500">Error loading item.</div>
    }

  return (
    <div className="w-[650px] flex items-center gap-4 p-4 m-2 bg-primary rounded-2xl shadow-2xl hover:shadow-lg transition relative">
        <div className="absolute right-[-55px] p-4 text-red-500 cursor-pointer hover:bg-red-200 rounded-full transition"
          onClick={()=>{
            removeFromCart(itemKey)
            refresh()
          }}
          >
            <FaTrash
                size={15}
            />
        </div>

      {/* Image */}
      <div className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-md bg-white">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-row justify-between ">
        
        {/* Top section */}
        <div className="flex flex-row justify-start items-center gap-5">
            <div className="text-lg font-semibold text-gray-800">
              {item.name}
            </div>
         

          <div className="text-sm text-gray-500 mt-1 capitalize">
            Category: {item.category}
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex items-center justify-end mt-4 gap-3">
          
          {/* Quantity */}
          <div className="flex items-center gap-2">

            {/* Price + Remove */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-mediumlight text-accent">
              Rs. {item.price.toFixed(2)}
             </span>
            </div>

            <button className="w-8 h-8 rounded-xl bg-secondary text-accent font-bold hover:bg-accent hover:text-white transition" 
             onClick={()=>{
                if(qty == 1){
                    removeFromCart(itemKey)
                    refresh()
                }else{
                    addToCart(itemKey, -1)
                    refresh()
                }
                
             }}   >
              −
            </button>

            <span className="font-medium">{qty}</span>

            <button className="w-8 h-8 rounded-xl bg-secondary text-accent font-bold hover:bg-accent hover:text-white transition"
            onClick={()=>{
                addToCart(itemKey, 1)
                refresh()
            }}>
              +
            </button>
            
            {/* total price */}
            <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-accent">
                     ${(item.price * qty).toFixed(2)}
                </span>
            </div>

          

          </div>
        </div>
      </div>
    </div>
  );
}


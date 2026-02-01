import axios from "axios"
import { useEffect, useState } from "react"
import { IoMdCloseCircleOutline } from "react-icons/io"

export default function AdminOrdersPage(){
    const[orders, setOrders] = useState([])
    const[loading, setLoading] = useState(true)
    const[activeOrder, setActiveOrder] = useState(null)
    const[modalOpend, setModalOpended] = useState(false)

    useEffect(() => {
    
   const fetchUsers = async () =>{
    try{
        const token = localStorage.getItem("token")
        const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
            {
               headers:{
                Authorization:`Bearer ${token}`
               }
            }
        )
        console.log(res.data)
        setOrders(res.data)
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

function handleOrderStatusChange(orderId, status){
    const token = localStorage.getItem("token")
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
        {
            status: status,
        },
        {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }
        
    ).then(()=>{
        setModalOpended(false)
        setLoading(true)
    }).catch((err)=>{
        console.log(err)
        setLoading(true)
    })
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Admin Order Management</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">Customer Email</th>
                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={()=>{
                    setActiveOrder(order)
                    setModalOpended(true)
                }}>
                  <td className="px-6 py-4 font-medium text-blue-600">{order.orderId}</td>
                  <td className="px-6 py-4 text-gray-700">{order.email}</td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(order.orderDate)}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {order.days} Days <br />
                    <span className="text-xs text-gray-400">
                      {formatDate(order.startingDate)} - {formatDate(order.endingDate)}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    Rs.{order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {order.status}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && !loading && (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {
        modalOpend &&(
            <div className="fixed top-0 left-0 w-full h-full bg-[#00000075] flex justify-center items-center">
                <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg relative">
                    <IoMdCloseCircleOutline className="w-8 h-8 absolute top-1 right-1 cursor-pointer hover:text-red-600" onClick={()=>setModalOpended(false)}/>
                    <h1 className="text-2xl mb-3">Order Details</h1>
                        <div className="flex flex-col gap-2">
                            <p> <span className="font-semibold">Order ID:</span>{activeOrder.orderId}</p>
                            <p> <span className="font-semibold">Email:</span>{activeOrder.email}</p>
                            <p> <span className="font-semibold">Days:</span>{activeOrder.days}</p>
                            <p> <span className="font-semibold">Starting Date:</span>{activeOrder.startingDate}</p>
                            <p> <span className="font-semibold">ending Date:</span>{activeOrder.endingDate}</p>
                            <p> <span className="font-semibold">Total Amount:</span>{activeOrder.totalAmount.toFixed(2)}</p>
                            <p> <span className="font-semibold">Approval Status:</span>{activeOrder.status}</p>
                            <p> <span className="font-semibold">Order Date:</span>{activeOrder.orderDate}</p>
                        </div>
                        <div className="w-full flex justify-start items-tept gap-3 my-5">
                            <button 
                            onClick={()=>{
                              handleOrderStatusChange(activeOrder.orderId, "Approved")
                            }}
                            className="flex bg-green-500 text-white px-3 py-1 rounded-md">Approved</button>
                            <button 
                             onClick={()=>{
                              handleOrderStatusChange(activeOrder.orderId, "Rejected")
                            }}
                            className="flex bg-orange-500 text-white px-3 py-1 rounded-md">Reject</button>
                        </div>
                        <div>
                            <table className="w-full mt-4">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        activeOrder.orderedItems.map((item)=>{
                                            return(
                                                <tr key={item.product.key}>
                                                    <td><img src={item.product.image} alt={item.product.name} className="w-10 h-10"/></td>
                                                    <td>{item.product.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.product.price.toFixed(2)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>
                </div>
            </div>
        )
      }
    </div>
  );
}
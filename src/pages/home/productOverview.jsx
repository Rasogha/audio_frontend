import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
    const params = useParams(); //catch the key that passed through URL
    const key = params.key
    const [loadingStatus, setLoadingStatus] = useState("loading") // loading, error, loaded;
    const [product, setProduct] = useState(null);

    useEffect(()=>{
        const backEndUrl = import.meta.env.VITE_BACKEND_URL
        axios.get(`${backEndUrl}/api/products/${key}`).then((res)=>{
            setProduct(res.data)
            setLoadingStatus("loaded")
            
        }).catch((err)=>{
            console.log(err)
            setLoadingStatus("error")
        },[key])
    })
    return(
        <div className="w-full h-full flex justify-center">
        {
            loadingStatus == "loading" && <div className="w-full h-full flex justify-center items-center">
                <div className="w-[20px] h-[20px] border-b-4 border-b-green-500 rounded-full animate-spin"></div>
            </div>
        }
        {
            loadingStatus == "loaded" && <div className="w-full h-full flex justify-center items-center">
                <div className="w-[45%] h-full bg-amber-600 ">
                    <ImageSlider images={product.image || []} />
                </div>
                <div className="w-[45%] h-full bg-green-500 flex flex-col items-center ">
                    <h1 className="text-3xl font-bold text-accent mt-4">{product.name}</h1>
                    <h1 className="text-xl font-semibold text-gray-500">{product.category}</h1>
                    <p className="text-md text-gray-500 mt-4">{product.description}</p>
                    <p className="text-sm font-bold text-gray-700">{product.price}</p>
                    <span className="font-medium">Dimensions {product.dimensions}</span>
                    <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md hover:shadow-xl transition cursor-pointer" 
                    onClick={()=>{
                            addToCart(product.key, 1)
                            toast.success("Item added to cart")
                        }}>Add to Cart
                    </button>
                </div>
            </div>
        }
        {
            loadingStatus == "error" && <div className="w-full h-full flex justify-center items-center">
                <p className="text-2xl text-red-500">Error loading product details</p>
            </div>
        }
        </div>
        
    )
}
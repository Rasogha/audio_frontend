import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
    return (
        <div className="w-[280px] h-wrap bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 m-4 flex flex-col">
            
            {/* Product Image */}
            <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center">
                <img
                    src={item.image?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="p-4">
                
                {/* Name */}
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {item.name}
                </h2>

                {/* Category */}
                <p className="text-sm text-gray-500 capitalize">
                    Category: {item.category}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {item.description}
                </p>

                {/* Price & Availability */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-[#efac38]">
                        Rs. {item.price}
                    </span>

                    <span
                        className={`text-sm font-medium px-3 py-1 rounded-full 
                        ${item.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                        {item.availability ? "In Stock" : "Out of Stock"}
                    </span>
                </div>

                {/* Action Button */}
                <button
                    disabled={!item.availability}
                    className={`mt-4 w-full h-[40px] rounded-lg text-white text-sm font-semibold 
                    ${item.availability 
                        ? "bg-[#4333f4] hover:bg-[#0e2640]" 
                        : "bg-gray-400 cursor-not-allowed"}`}
                  //item.key is passed through URL  
                ><Link to={`/product/${item.key}`}>      
                    View Product
                </Link>
                </button>
                <button
                    disabled={!item.availability}
                    className={`mt-4 w-full h-[40px] rounded-lg text-white text-sm font-semibold 
                    ${item.availability 
                        ? "bg-[#efac38] hover:bg-[#d9982f]" 
                        : "bg-gray-400 cursor-not-allowed"}`}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

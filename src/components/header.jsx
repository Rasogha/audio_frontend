import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-[100px] shadow-xl flex justify-center items-center relative bg-accent text-white">
            <Link to='/' className="w-[100px] h-[100px] object-cover rounded-full absolute left-[4px]">
                <img src="/logo.png" alt='logo' className="w-full h-full object-cover border-[1px] rounded-full absolute left-[4px]" />
            </Link>
            <Link to='/' className="text-[25px] font-bold m-1">
                Home
            </Link> 
            <Link to='/contact' className="text-[25px] font-bold m-1">
                Contact
            </Link>
            <Link to='/gallery' className="text-[25px] font-bold m-1">
                Gallery
            </Link>   
            <Link to='/items' className="text-[25px] font-bold m-1">
                Items
            </Link>
            <Link to='/booking' className="text-[25px] font-bold m-1 absolute right-3">
                <FaCartShopping/>
            </Link>    

        </header>
    )
}

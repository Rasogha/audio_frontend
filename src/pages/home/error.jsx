import { Link } from "react-router-dom";

export default function ErrorNotFound(){
    return(
        <div>
            <h1>Error! Not Found</h1>
            <Link className='bg-[#efac38] mt-[4px] p-[5px]' to='/'>Go Back To Home</Link>
        </div>
    )
}
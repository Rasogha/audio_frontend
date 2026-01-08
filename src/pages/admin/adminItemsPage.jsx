const sampleArr = [
    {
        key:"P001",
        name:"wireless headphone",
        price: 99.99,
        category: "audio",
        dimensions: "20x15x5 cm",
        description: "High- quality",
        availability: true,
        image: ["https://example.com/headphones.jpg"]
    },
    {
        key:"P002",
        name:"bluetooth speaker",
        price: 49.99,
        category: "audio",
        dimensions: "10x10x10 cm",
        description: "High- quality",
        availability: true,
        image: ["https://example.com/bluetoothSpeaker.jpg"]
    }

]
import { useState } from "react"
import { CiCirclePlus } from "react-icons/ci"
import { Link } from "react-router-dom"
export default function AdminItemsPage(){
    //need items array as attribute
    const[items, setItems] = useState(sampleArr)

    //here we are using JS programming inside the HTMLs
    return(
        <div className="w-full h-full relative"> 
            <table>
                <thead>  
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Key</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Description</th>
                </thead>
    
                <tbody>     
                    {
                        items.map((product)=>{    //above array data will pass 
                            console.log(product) //returns will display in table
                            return(
                                <tr key={product.key}>  {/** or you can use 'index' as key and 'index' need to add to above maping function parameters*/}
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.description}</td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>
            <Link to='/admin/items/add'>
                <CiCirclePlus className="text-[70px] absolute bottom-1 right-1 cursor-pointer hover:text-red-900 "/>
            </Link>
        </div>
    )
}
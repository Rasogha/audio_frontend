import { useEffect, useState } from "react"

export default function ImageSlider(props){
    const images = props.images
    const [selectedImage, setSelectedImage] = useState(images[0]) //default selected image is the first image
    
    useEffect(()=>{
        if(images && images.length > 0){
            setSelectedImage(selectedImage || images[0])
        }
    }, [images])
    
    if(!images || images.length == 0) return null
    
    return(
        <div className="w-full h-full flex flex-col items-center mt-4">
            <img src={selectedImage} alt="product" className="w-[90%] h-[70%] object-cover cursor-pointer "></img>
            <div className="w-full h-[120px] flex object-cover justify-center">
                {
                    images.map((image,index)=>{
                        return(
                            <img key={index} 
                                src={image} 
                                alt="product" className={`w-[20%] h-full object-cover p-2 cursor-pointer ${image == selectedImage && "border border-accent-500"}`} onClick={
                                    ()=>{
                                            setSelectedImage(image)
                                        }
                                    }>

                            </img>
                        )
                    })
                }
            </div>
        </div>
    )
} 
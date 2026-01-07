import { useState } from "react"

export default function Testing(){
    const[count,setCount] = useState(0) //count should be started from '0'
                                        //setCount function will do two works
    const [itemName, setItemName] = useState('coconut')

    return(
        <div className="w-full h-screen bg-orange-100 flex flex-col justify-center items-center
        ">
            <h1 className="text-9xl text-white">{count} {itemName}</h1>

            <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                ()=>{
                    const newCount = count + 1
                    setCount(newCount)

                }
                
            }>
                Count
            </button>
            <div className=" p-4 w-full flex justify-evenly">
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick ={
                    ()=> {
                        setItemName('coconut')
                        
                    }
                }>coconut</button>
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick ={
                    ()=> {
                        setItemName('banana')
                        
                    }
                }>banana</button>
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick ={
                    ()=> {
                        setItemName('apple')
                        
                    }
                }>apple</button>
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick ={
                    ()=> {
                        setItemName('other')
                        
                    }
                }>other</button>
            </div>
        </div>
    )
}
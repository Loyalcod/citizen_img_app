"use client"
import Image from "next/image"
import { useState } from "react"

interface DivimageProps{
    selectedImage: string
}

function Divimage(props: DivimageProps) {
    const { selectedImage} = props

    
  return (
    <>
        <div className="w-[90%] h-[250px] md:h-[300px] md:w-[40%] bg-white relative">
            <div className="w-full h-full bg-blue-500">
            <img src={selectedImage} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div className=" logoImage top-0 md:w-[120px] mt-[10px] md:h-[35px] h-[30px] w-[100px] absolute left-[10px]"></div>
            
        </div>
    </>
  )
}

export default Divimage
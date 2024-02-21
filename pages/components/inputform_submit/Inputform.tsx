"use client"

import { useState, ChangeEvent, useRef, LegacyRef } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";

type ImageState = string;

interface DivImageProps {
    targetImage: string,
}

function Inputform() {
    const [targetImage, setTargetImage] = useState<string | null>(null);
    const [textInput, setTextInput] = useState<string>('')
    
    const exportDivImageRef = useRef<HTMLDivElement>() as LegacyRef<HTMLDivElement>;
    const [downloading, setDownloading] = useState<boolean>(false);

    // this is my converter
    const exportAsImage = async (element: HTMLDivElement, imageFileName: string) => {
        setDownloading(true);
    
        try {
          const canvas = await html2canvas(element, {
            allowTaint: true,
            useCORS: true,
          });
    
          const image = canvas.toDataURL("image/png", 1.0);
          downloadImage(image, imageFileName);
        } catch (error) {
          setDownloading(false);
        }
      };
    
      const downloadImage = (blob: string, fileName: string) => {
        try {
          const fakeLink = document.createElement("a");
          fakeLink.style.display = "none";
          fakeLink.download = fileName;
          fakeLink.href = blob;
    
          document.body.appendChild(fakeLink);
          fakeLink.click();
          document.body.removeChild(fakeLink);
    
          setDownloading(false);
        } catch (error) {
          setDownloading(false);
        }
      };
    // end of my converter


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;
            if (typeof result === 'string') {
                setTargetImage(result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const colonIndex:number = textInput.indexOf(':')

    const prefix = textInput.substring(0, colonIndex+1)
    const otherSentence = textInput.split(':')[1]
    const suffix = textInput.substring(0, colonIndex+1)
    

    

    return (
        <>
            <form action="submit" className='w-[90%] md:container'>
                <div className='w-full md:w-[100%]  md:container flex justify-center items-center gap-6 py-[20px]  flex-col px-[20px] bg-black-900'>
                    <div className='bg-white w-[80%] '>
                        <input type="file" accept='image/*' onChange={handleImageChange} className=' w-[80%]' />
                    </div>
                    <input type="text" value={textInput} onChange={(e)=>setTextInput(e.target.value)} className=' px-2 w-[80%] h-[40px]'/>
                    
                    {/* <button className='w-[80%] text-white bg-red-700 h-[40 */}
                </div>
            </form>
            {/* Correct the prop name here */}
            <div ref={exportDivImageRef} className="w-[90%] h-[250px] image-container md:h-[300px] md:w-[40%] bg-white relative">
            <div className="w-full h-full bg-white">
            {targetImage ? (<Image src={targetImage} alt="Selected Image" className="w-full h-full object-contain" width={100} height={100} style={{ maxWidth: '100%', maxHeight: '100%' }} />) : null}
            </div>
            <div className=" logoImage z-20 top-0 md:w-[120px] mt-[10px] md:h-[35px] h-[25px] w-[60px] absolute left-[10px]"></div>
            <div className="absolute w-full flex place-items-end h-[60%] bg-gradient-to-b from-[rgba(0,0,0,0.0)] via-[rgba(0,0,0,0.7)]  to-[rgba(0,0,0,10)] bottom-0">
                <div className="w-full h-[65%] md:hidden">
                    <p className="text-blue-600 px-1 md:hidden text-center text-[19px] font-sans font-semibold leading-6">
                        <span className="text-white font-bold">{prefix}</span>
                        <span>{otherSentence}</span>
                    </p>                    
                </div>
                <div className="w-full h-[45%] hidden md:block">
                    <p className="text-blue-600 px-2 text-center text-[24px] font-sans font-semibold leading-7">
                        <span className="text-white font-bold">{prefix}</span>
                        <span>{otherSentence}</span>
                    </p>                    
                </div>
            </div>
            
        </div>

        <div className='w-[90%] md:container'>
                <div className='w-full md:w-[100%]  md:container flex justify-center items-center gap-6 py-[20px]  flex-col px-[20px] bg-black-900'>
                    <button onClick={() => exportAsImage(exportDivImageRef.current, "card-image.png")}  className='w-[80%] text-white bg-red-700 h-[40px]'>Convert To Image</button>
                </div>
            </div>
        </>
    );
}

export default Inputform;



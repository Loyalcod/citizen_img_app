"use client";

import { useState, ChangeEvent, useRef, LegacyRef } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import logo from "../../../public/logo.png"
import logo_1 from "../../../public/logo_1.jpg"
import logo_2 from "../../../public/logo_2.jpg"
import logo_3 from "../../../public/logo_3.jpg"

function Inputform() {
  const [targetImage, setTargetImage] = useState(null);
  const [textInput, setTextInput] = useState("");

  const exportDivImageRef = useRef();
  const [downloading, setDownloading] = useState(false);
  const [potriatImage, setPotriateImage] = useState(false)

  // this is my converter
  const exportAsImage = async (element, imageFileName) => {
    setDownloading(true);

    try {
      const canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
    //     width: rect.width, 
    //   height: rect.height
      });

      const image = canvas.toDataURL("image/png", 2.0);
      downloadImage(image, imageFileName);
    } catch (error) {
      setDownloading(false);
    }
  };

  const downloadImage = (blob, fileName) => {
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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setTargetImage(result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const colonIndex = textInput.indexOf(":");

  const prefix = textInput.substring(0, colonIndex + 1);
  const otherSentence = textInput.split(":")[1];
  const suffix = textInput.substring(0, colonIndex + 1);

  return (
    <>
      <div className="w-[90%] md:container">
        <div className="w-full md:w-[100%]  md:container flex justify-center items-center gap-6 py-[20px]  flex-col px-[20px] bg-black-900">
          <div className="bg-white w-[80%] ">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className=" w-[80%]"
            />
          </div>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className=" px-2 w-[80%] h-[40px]"
          />

          <div onClick={()=> setPotriateImage((item) => !item)} className="text-white cursor-pointer py-2 px-2 rounded-md bg-red-700">choose Potriate image</div>

          {/* <button className='w-[80%] text-white bg-red-700 h-[40 */}
        </div>
      </div>
      {/* Correct the prop name here */}
      <div
        ref={exportDivImageRef}
        className={`${targetImage ? 'px-2 py-3  bg-white relative' : ''}`}
      >
        
        {/* <Image src={logo_2} alt="citizen_logo" width={50} height={20} srcSet={logo} className="z-20 top-0 md:w-[120px] mt-[10px] md:h-[35px] absolute left-[10px]"/> */}
        <div className={` bg-white ${potriatImage ? 'mb-0' : 'mb-[90px]'}`}>
          {targetImage ? (
            <Image
              src={targetImage}
              alt="Selected Image"
              className="w-full h-full object-fill"
              width={100}
              height={100}
            //   style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : null}
        </div>
        <div className="logoImage z-20 top-0 md:w-[120px] mt-[10px] md:h-[35px] h-[25px] w-[90px] absolute left-[10px]">
        </div>
        {textInput ? (
            <div className="absolute left-0 px-2 flex place-items-end py-[10px] bottom-0 ">
            <div className="w-full h-auto md:hidden">
              <p className="text-white px-2 pb-[20px] bg-red-700 md:hidden text-center text-[19px] font-sans font-semibold leading-6">
                <span className="text-blue-700 font-bold">{prefix}</span>
                <span>{otherSentence}</span>
              </p>
            </div>
            <div className="w-full h-auto hidden md:block">
              <p className="text-white px-2 pb-[20px] bg-red-700 text-center text-[30px] font-sans font-semibold leading-9">
                <span className="text-black font-bold">{prefix}</span>
                <span>{otherSentence}</span>
              </p>
            </div>
            
          </div>
        ) : null}
      </div>

      <div className="w-[90%] md:container">
        <div className="w-full md:w-[100%]  md:container flex justify-center items-center gap-6 py-[20px]  flex-col px-[20px] bg-black-900">
          <button
            onClick={() =>
              exportAsImage(exportDivImageRef.current, "card-image.png")
            }
            className="w-[80%] text-white bg-red-700 h-[40px]"
          >
            Convert To Image
          </button>
        </div>
      </div>
    </>
  );
}

export default Inputform;
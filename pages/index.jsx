import Image from "next/image";
import { Inter } from "next/font/google";
import Inputform from "./components/inputform_submit/Inputform";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
    
    <>
        <div className="w-full md:w-[90%] md:m-auto bg-black h-full md:h-auto gap-8 py-[50px] flex flex-col items-center">
        <Inputform/>
        </div>
    </>
  );
}

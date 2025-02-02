// import Image from 'next/image'
import ImageFrame from "../../../../assets/TheHomePage/image/paper-frame-2.png";
import "../../../../style/TheHomePage/font.css"
export default function HexapinkPaperTwoFrame() {
  return (
    <div className='flex justify-center items-center gap-4'>
        <img src={ImageFrame} alt="" />
        <div className='flex flex-col justify-center items-start gap-3'>
            <h1 className='font-[raleway-medium] text-[20px] text-[#666666]'>Select Collection</h1>
            <h1 className='font-[raleway-medium] text-[20px] text-[#666666]'>Select Location</h1>   
            <h1 className='font-[raleway-medium] text-[20px] text-[#666666]'>Specify your Lead</h1>   
        </div>
    </div>
  )
}

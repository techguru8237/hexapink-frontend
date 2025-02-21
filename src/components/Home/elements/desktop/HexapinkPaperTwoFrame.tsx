import ImageFrame from "../../../../assets/TheHomePage/image/paper-frame-2.svg";
import "../../../../style/TheHomePage/font.css"
export default function HexapinkPaperTwoFrame() {
  return (
    <div className='flex justify-center items-center gap-4'>
        <img src={ImageFrame} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
            <h1 className='font-raleway font-medium text-[20px] text-light-dark'>Select Collection</h1>
            <h1 className='font-raleway font-medium text-[20px] text-light-dark'>Select Location</h1>   
            <h1 className='font-raleway font-medium text-[20px] text-light-dark'>Specify your Lead</h1>   
        </div>
    </div>
  )
}

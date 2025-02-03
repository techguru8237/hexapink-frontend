// import frame48096154 from "./frame-48096154.svg";
// import plusCircle from "./plus-circle.svg";
import { JSX } from "react";


const NewSidebar = (): JSX.Element => {
  return (
    <div className="flex flex-col w-[300px] items-start gap-2.5 relative">
      <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
        <div className="flex h-12 items-center gap-2 pl-4 pr-0 py-0 relative self-stretch w-full border-b [border-bottom-style:dashed] border-[#ebebf8]">
          <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#333333] text-sm tracking-[0.28px] leading-[21px] whitespace-nowrap">
            Create New Table
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 p-6 relative self-stretch w-full flex-[0_0_auto] border-b [border-bottom-style:dashed] border-[#ececf9]">
          <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Raleway-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0.24px] leading-[18px] whitespace-nowrap">
              Table Name
            </div>

            <div className="flex h-[42px] items-center gap-4 px-4 py-0 relative self-stretch w-full mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[inset_0px_0px_0px_4px_#ebebf8]">
              <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#4040bf] text-sm tracking-[0.28px] leading-[21px] whitespace-nowrap">
                France Table 1
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Raleway-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0.24px] leading-[18px] whitespace-nowrap">
              Selected File
            </div>

            <div className="flex h-[42px] items-center justify-between pl-4 pr-2 py-0 relative self-stretch w-full mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] bg-white rounded-lg overflow-hidden border border-solid border-[#d9d9f2]">
              <div className="relative w-fit [font-family:'Raleway-Medium',Helvetica] font-medium text-[#999999] text-sm tracking-[0.28px] leading-[21px] whitespace-nowrap">
                Select Your File
              </div>

              {/* <img
                className="relative flex-[0_0_auto] h-6"
                alt="Frame"
                src={frame48096154}
              /> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 p-6 relative self-stretch w-full flex-[0_0_auto] border-b [border-bottom-style:dashed] border-[#ebebf8]">
          <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex h-10 items-center justify-center gap-1 px-5 py-2 relative self-stretch w-full bg-[#3f3fbf] rounded-[20px] opacity-20">
              {/* <img
                className="relative w-5 h-5"
                alt="Plus circle"
                src={plusCircle}
              /> */}

              <div className="relative w-fit [font-family:'Raleway-Medium',Helvetica] font-medium text-white text-sm tracking-[0.28px] leading-[21px] whitespace-nowrap">
                Create Table
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSidebar;
// import frame48096154 from "./frame-48096154.svg";
// import plusCircle from "./plus-circle.svg";
// import { VscAdd } from "react-icons/vsc";
import { JSX } from "react";
import Input from "../components/Common/Input";
import Upload from "../components/Common/Upload";


const NewSidebar = (): JSX.Element => {
  return (
    <div className="flex flex-col w-[350px] items-start gap-2.5 relative">
      <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
        <div className="flex h-12 items-center gap-2 pl-4 pr-0 py-0 relative self-stretch w-full border-b [border-bottom-style:dashed] border-[#ebebf8]">
          <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#333333] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
            Create New Table
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 p-6 relative self-stretch w-full flex-[0_0_auto] border-b [border-bottom-style:dashed] border-[#ececf9]">
          <Input label="Table Name" value="France Table 2" />

          {/* <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Raleway-Medium',Helvetica] font-medium text-light-dark text-sm tracking-[0.24px] leading-[18px] whitespace-nowrap">
              Selected File
            </div>

            <div className="flex h-[42px] items-center justify-between pl-4 pr-2 py-0 relative self-stretch w-full mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] bg-white rounded-lg overflow-hidden border border-solid border-[#d9d9f2]">
              <div className="relative w-fit [font-family:'Raleway-Medium',Helvetica] font-medium text-[#999999] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
                Select Your File
              </div>
              <VscAdd className="text-[#4040BF] p-1.5 w-7 h-7 border border-[#4040BF] rounded-lg " />
            </div>
          </div> */}
          <Upload
            label="Selected File" 
            value="Select Your File"
            // onAddClick={handleAddClick}
            // showReload={showReload}
          />
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
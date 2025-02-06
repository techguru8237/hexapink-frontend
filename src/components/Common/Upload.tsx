import { VscAdd } from "react-icons/vsc";
// import { TfiReload } from "react-icons/tfi";

interface HeaderProps {
  label: string;
  value: string;
  // onAddClick: () => void; 
  // showReload: boolean;
}

export default function Input({ label, value }: HeaderProps) {
  return (
    <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
      <div className="relative w-fit mt-[-1.00px] [font-family:'Raleway-Medium',Helvetica] font-medium text-light-dark text-sm tracking-[0.24px] leading-[18px] whitespace-nowrap">
        {label}
      </div>

      <div className="flex h-[42px] items-center justify-between pl-4 pr-2 py-0 relative self-stretch w-full mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] bg-white rounded-lg overflow-hidden border border-solid border-[#d9d9f2]">
        <div className="relative w-fit [font-family:'Raleway-Medium',Helvetica] font-medium text-[#999999] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
          {value}
        </div>
        <div className="flex flex-row">
          {/* <TfiReload className="text-[#4040BF] p-1.5 w-7 h-7 border border-[#4040BF] rounded-lg mr-1" /> */}
          <VscAdd className="text-[#4040BF] p-1.5 w-7 h-7 border border-[#4040BF] rounded-lg " />
        </div>
      </div>
    </div>
  )
}



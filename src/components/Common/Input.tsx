interface HeaderProps {
  label: string;
  value: string;
}

export default function Input ({ label, value }: HeaderProps) {
  return (
    <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
      <div className="relative w-fit mt-[-1.00px] [font-family:'Raleway-Medium',Helvetica] font-medium text-[#666666] text-sm tracking-[0.24px] leading-[18px] whitespace-nowrap">
        {label}
      </div>

      <div className="flex h-[42px] items-center gap-4 px-4 py-0 relative self-stretch w-full mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[inset_0px_0px_0px_4px_#ebebf8]">
        <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#4040bf] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
          {value}
        </div>
      </div>
    </div>
  )
}



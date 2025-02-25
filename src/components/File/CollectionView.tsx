import { PiDatabaseLight, PiMapPinLight } from "react-icons/pi";

import { Collection } from "../../types";

export default function CollectionView({ data }: { data: Collection }) {
  return (
    <div className="flex flex-col items-center relative w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
      <div className="w-full p-4 flex items-center gap-4 border-b border-dashed border-light-gray-3">
        <div className="w-12 h-12 bg-[#F0F0FA] border border-light-gray-3 rounded-l-lg flex items-center justify-center rounded-lg">
          {/* <PiImageSquareLight className="text-2xl" /> */}
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${data.image?.replace(
              "uploads",
              ""
            )}`}
            alt="file image"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <span className="font-bold text-left">{data.title}</span>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center">
              <PiDatabaseLight className="text-md" />
              <span>{data.type}</span>
            </div>
            <div className="flex items-center">
              <PiMapPinLight className="text-md" />
              <span className="text-left">
                {data.countries?.length && data.countries[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center gap-2 border-b border-dashed border-light-gray-3">
      </div>
    </div>
  );
}

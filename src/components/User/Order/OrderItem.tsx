import { useEffect, useState } from "react";

import { GiPositionMarker } from "react-icons/gi";
import {
  PiDatabaseLight,
  PiDownloadSimpleLight,
  PiPackage,
} from "react-icons/pi";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";

import { File, Order } from "../../../types";
import { useCurrency } from "../../../contexts/Currency";
import { formatDate } from "../../../utils/formatDate";
import { handleDownloadToCSV } from "../../../utils/fileDownload";

interface OrderItemProps {
  orderData: Order;
}

export default function OrderItem({ orderData }: OrderItemProps) {
  const { currency } = useCurrency();
  const [fileIndex, setFileIndex] = useState<number>(1);
  const [fileData, setFileData] = useState<File | undefined>(undefined);

  useEffect(() => {
    setFileData(orderData.files[fileIndex - 1]);
  }, [orderData, fileIndex]);

  if (!fileData) {
    return null; // or some loading state
  }

  return (
    <div className="min-w-[500px] bg-white border border-light-gray-3 rounded-lg flex flex-col text-xs">
      <div className="flex items-center border-b border-dashed border-light-gray-3 p-4">
        {/* Header */}
        <div className="w-full flex items-center justify-between text-sm">
          <div className="flex items-center divide-x divide-light-gray-3">
            <div className="flex items-center gap-1 text-lg font-medium pr-2">
              <PiPackage />
              <span>{orderData._id.slice(-4)}</span>
            </div>
            <span className="pl-2">
              {formatDate(orderData.createdAt)}
            </span>
          </div>
          <div className="text-xs">
            {orderData.paid === "Paid" ? (
              <span className="text-green border border-light-green-1 bg-light-green-2 px-2 py-1 rounded-md">
                Paid
              </span>
            ) : (
              <div className="flex items-center gap-1">
                <button className="bg-dark-blue text-white rounded-full py-1 px-2">
                  Pay Now
                </button>
                <span className="text-red border border-light-red-1 bg-light-red-2 px-2 py-1 rounded-md">
                  UnPaid
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Total Volumn and Prix */}
      <div className="w-full flex items-center justify-center flex-wrap border-b border-light-gray-3 divide-x divide-light-gray-3 py-4">
        <div className="flex flex-1 items-baseline px-4 gap-1">
          <span className="text-light-dark">Volume Total</span>
          <div className="flex-1 border border-b bg-light-gray-1"></div>
          <span className="font-bold text-dark-blue">{orderData.volume}</span>
        </div>
        <div className="flex flex-1 items-baseline px-4 gap-1">
          <span className="text-light-dark">Prix Total</span>
          <div className="flex-1 border border-b bg-light-gray-1"></div>
          <span className="font-bold text-dark-blue">
            {currency}
            {orderData.prix}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-6">
        {/* File Navigation */}
        <div className="flex items-center justify-between">
          <span>{orderData.files.length} Files</span>
          <div className="flex items-center gap-4 text-sm">
            <button
              disabled={fileIndex === 1}
              onClick={() => setFileIndex((current) => current - 1)}
              className="bg-transparent border-none p-0"
            >
              <HiArrowSmallLeft className="" />
            </button>
            <button
              disabled={fileIndex === orderData.files.length}
              onClick={() => setFileIndex((current) => current + 1)}
              className="bg-transparent border-none p-0"
            >
              <HiArrowSmallRight />
            </button>
          </div>
        </div>
        {/* File Content */}
        <div className="border border-light-gray-3 rounded-lg flex flex-col">
          <div className="flex items-start justify-between border-b border-dashed border-light-gray-3">
            <div className="flex items-center gap-2 p-4">
              <div className="w-10 h-10 border border-light-gray-3 rounded-l-lg flex items-center justify-center flex-shrink-0 rounded-lg">
                <img
                  src={
                    import.meta.env.VITE_BACKEND_URL +
                    fileData.image.replace("uploads", "")
                  }
                  alt="file image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg">{fileData.title}</span>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center">
                    <PiDatabaseLight className="text-md flex-shrink-0" />
                    <span className="text-left">{fileData.type}</span>
                  </div>
                  <div className="flex items-center">
                    <GiPositionMarker className="text-md flex-shrink-0" />
                    <span className="text-left">{fileData.countries[0]}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4">
              {/* Download file from path (fileData.path) */}
              <button
                onClick={() => handleDownloadToCSV(fileData.path)}
                className="p-0.5 bg-white border border-light-gray-3 rounded-md"
              >
                <PiDownloadSimpleLight className="text-lg" />
              </button>
              {fileData.status === "Ready" ? (
                <span className="text-green border border-light-green-1 bg-light-green-2 p-1 rounded-md">
                  Ready
                </span>
              ) : (
                <span className="border border-light-gray-1 bg-light-gray-2 p-1 rounded-sm">
                  Unready
                </span>
              )}
            </div>
          </div>
          {/* File Volumn and Prix */}
          <div className="w-full flex items-center justify-center flex-wrap divide-x divide-light-gray-3 py-3">
            <div className="flex flex-1 items-baseline px-4 gap-1">
              <span className="text-light-dark">Volume</span>
              <div className="flex-1 border border-b bg-light-gray-1"></div>
              <span className="font-bold">{fileData.volume}</span>
            </div>
            <div className="flex flex-1 items-baseline px-4 gap-1">
              <span className="text-light-dark">Prix</span>
              <div className="flex-1 border border-b bg-light-gray-1"></div>
              <span className="font-bold">
                {currency}
                {fileData.volume * fileData.unitPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

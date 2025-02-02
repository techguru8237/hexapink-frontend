// import React, { useState, useEffect } from "react";
// import { RiCloseLine } from "react-icons/ri";
// import { FiRefreshCcw } from "react-icons/fi";
// import { CiFilter } from "react-icons/ci";
// import Checkbox from "../Checkbox";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { TextField } from "@mui/material"

// interface Item {
//   status: string;
//   volume: number;
//   date: string;
// }

// interface FilterPanelProps {
//   onClose: () => void;
//   items: Item[];
//   setFilteredItems: (items: Item[]) => void;
// }

// const FilterPanel: React.FC<FilterPanelProps> = ({ onClose, items, setFilteredItems }) => {
//   const [exportStatus, setExportStatus] = useState("");
//   const [minVolume, setMinVolume] = useState("");
//   const [maxVolume, setMaxVolume] = useState("");
//   const [minDate, setMinDate] = useState<Date | null>(null);
//   const [maxDate, setMaxDate] = useState<Date | null>(null);

//   useEffect(() => {
//     const filtered = items.filter((item) => {
//       const matchesStatus = exportStatus ? item.status === exportStatus : true;
//       const matchesVolume =
//         (minVolume ? item.volume >= Number(minVolume) : true) &&
//         (maxVolume ? item.volume <= Number(maxVolume) : true);
//       const matchesMinDate = minDate
//         ? new Date(item.date) >= new Date(minDate)
//         : true;
//       const matchesMaxDate = maxDate
//         ? new Date(item.date) <= new Date(maxDate)
//         : true;

//       return matchesStatus && matchesVolume && matchesMinDate && matchesMaxDate;
//     });

//     setFilteredItems(filtered);
//   }, [
//     exportStatus,
//     minVolume,
//     maxVolume,
//     minDate,
//     maxDate,
//     items,
//     setFilteredItems,
//   ]);

//   return (
//     <div className="w-80 h-full bg-white border border-dark-blue rounded-lg shadow-lg">
//       <div className="flex justify-between items-center border-b p-4">
//         <button
//           onClick={() => window.location.reload()}
//           className="border border-light-gray3 p-2 rounded-md"
//         >
//           <FiRefreshCcw />
//         </button>
//         <div className="flex items-center gap-2">
//           <CiFilter />
//           <span>Filter</span>
//         </div>
//         <button onClick={onClose} className="text-dark">
//           <RiCloseLine className="text-2xl" />
//         </button>
//       </div>

//       <div className="p-4 border-b border-dashed border-light-gray3">
//         <h3 className="font-bold mb-2">Export Status</h3>
//         <div className="flex flex-col gap-2">
//           <div
//             className={`flex items-center gap-2 border rounded-lg p-2 cursor-pointer ${
//               exportStatus === "Ready" ? "bg-light-gray2 text-dark-blue" : ""
//             }`}
//             onClick={() => setExportStatus("Ready")}
//           >
//             <Checkbox checked={exportStatus === "Ready"} />
//             <span>Ready</span>
//           </div>
//           <div
//             className={`flex items-center gap-2 border rounded-lg p-2 cursor-pointer ${
//               exportStatus === "Exporting"
//                 ? "bg-light-gray2 text-dark-blue"
//                 : ""
//             }`}
//             onClick={() => setExportStatus("Exporting")}
//           >
//             <Checkbox checked={exportStatus === "Exporting"} />
//             <span>Exporting</span>
//           </div>
//         </div>
//       </div>

//       <div className="p-4 border-b border-dashed border-light-gray3">
//         <h3 className="font-bold mb-2">Volume Selection</h3>
//         <div className="flex gap-2">
//           <input
//             type="number"
//             placeholder="Min"
//             value={minVolume}
//             onChange={(e) => setMinVolume(e.target.value)}
//             className="border p-2 w-full focus:outline-none rounded-lg"
//           />
//           <input
//             type="number"
//             placeholder="Max"
//             value={maxVolume}
//             onChange={(e) => setMaxVolume(e.target.value)}
//             className="border p-2 w-full focus:outline-none rounded-lg"
//           />
//         </div>
//       </div>

//       <div className="p-4">
//         <h3 className="font-bold mb-2">Date Pick</h3>
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <div className="flex flex-col gap-4">
//             <DatePicker
//               label="Min Date"
//               value={minDate}
//               onChange={(newValue) => setMinDate(newValue)}
//               renderInput={(params) => (
//                 <TextField {...params} className="border p-2 rounded-lg w-full" />
//               )}
//             />
//             {/* <DatePicker
//               label="Max Date"
//               value={maxDate}
//               onChange={(newValue) => setMaxDate(newValue)}
//               renderInput={(params) => (
//                 <TextField {...params} className="border p-2 rounded-lg w-full" />
//               )}
//             /> */}
//           </div>
//         </LocalizationProvider>
//       </div>
//     </div>
//   );
// };

// export default FilterPanel;

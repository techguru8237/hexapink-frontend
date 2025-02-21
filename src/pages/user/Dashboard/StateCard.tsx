import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: number;
  link?: string;
}

const StatCard = ({ title, value, link }: StatCardProps) => {
  return (
    <div className="w-full bg-white border-2 border-light-gray-3 rounded-lg shadow-md">
      <div className="flex items-center justify-between px-4 py-3 border-b border-dashed border-light-gray-3">
        <h3 className="text-sm font-medium">{title}</h3>
        {link && (
          <Link
            to={link}
            className="text-xs text-dark-blue underline"
          >
            More <GoArrowUpRight className="inline-block" />
          </Link>
        )}
      </div>
      <div className="w-full p-4 text-dark-blue text-2xl text-left font-bold">
        {value}
      </div>
    </div>
  );
};

export default StatCard;

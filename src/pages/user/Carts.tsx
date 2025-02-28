import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiPackage, PiShoppingCartFill } from "react-icons/pi";
import { GoArrowRight } from "react-icons/go";

import useCartStore from "../../Store/useCartStore";

import UserHeader from "../../components/User/UserHeader";
import Pagination from "../../components/Common/Pagination";
import CartListHeader from "../../components/User/Cart/CartListHeader";
import { CartListItem } from "../../components/User/Cart/CartListItem";
import NewCartSkeleton from "../../components/User/Cart/NewCartSkeleton";
import { useCurrency } from "../../contexts/Currency";

export default function Carts() {
  const { currency } = useCurrency();
  const navigate = useNavigate();

  const carts = useCartStore((state) => state.carts);
  const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);

  const selectedCarts = carts.filter((cart) =>
    selectedCartIds.includes(cart.id)
  );

  const totalLeads = selectedCarts.reduce((acc, cart) => acc + cart.volumn, 0);
  const totalPrice = selectedCarts.reduce(
    (acc, cart) => acc + cart.volumn * (cart.collection.fee || 1),
    0
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedCartIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((fileId) => fileId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleGotoCheckout = () => {
    navigate("/user/files/new", { state: selectedCartIds });
  };

  return (
    <div className="h-full flex flex-col">
      <UserHeader icon={<PiShoppingCartFill />} label="Cart" />

      <div className="h-full bg-light-gray border-b border-light-gray-1 flex">
        <div className="flex flex-col flex-1 border-r border-light-gray-1">
          <div className="px-8 py-4 border-b border-light-gray-1 flex items-center justify-between text-light-dark">
            {selectedCartIds.length > 0 && (
              <span>{selectedCartIds.length} Selected</span>
            )}
            <div className="ml-auto flex items-center divide-x">
              <div className="pl-4">
                <Pagination
                  onPageSizeChange={() => {}}
                  rowsPerPage={itemsPerPage}
                  pageSizeOptions={[5, 10, 20, 50]}
                  currentPage={currentPage}
                  totalPages={Math.ceil(carts.length / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>

          <NewCartSkeleton />

          <div className="p-8 flex flex-col gap-4">
            <CartListHeader />
            {carts.map((item, index) => (
              <CartListItem
                key={index}
                cart={item}
                index={index}
                isSelected={selectedCartIds.includes(item.id)}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </div>
        </div>

        <div className="w-80 px-4 py-4 border-l border-light-gray-1 flex flex-col">
          <div className="flex flex-col items-center relative w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
            <div className="w-full p-4 flex items-center justify-start gap-4 border-b border-dashed border-light-gray-3">
              <PiPackage />
              My Order
            </div>
            <div className="w-full p-6 flex flex-col gap-2 border-b border-dashed border-light-gray-3">
              <div className="w-full flex items-baseline gap-1">
                <span className="text-sm font-semibold text-light-dark">
                  Selected Files
                </span>
                <div className="flex-1 border-b border-light-gray-3"></div>
                <span className="text-dark-blue">{selectedCartIds.length}</span>
              </div>
              <div className="w-full flex items-baseline gap-1">
                <span className="text-sm font-semibold text-light-dark">
                  Total Leads
                </span>
                <div className="flex-1 border-b border-light-gray-3"></div>
                <span className="text-dark-blue">{totalLeads}</span>
              </div>
              <div className="w-full flex items-baseline gap-1">
                <span className="text-sm font-semibold text-light-dark">
                  Total Price
                </span>
                <div className="flex-1 border-b border-light-gray-3"></div>
                <div className="text-dark-blue flex items-center">
                  {currency} <span>{totalPrice}</span>
                </div>
              </div>
            </div>
            <div className="w-full p-6 gap-2">
              <button
                onClick={handleGotoCheckout}
                disabled={selectedCartIds.length > 0 ? false : true}
                className="w-full flex items-center gap-2 justify-center bg-dark-blue text-white rounded-full p-2"
              >
                Go to Checkout <GoArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

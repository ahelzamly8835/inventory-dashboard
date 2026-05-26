import { suppliersData } from "../suppliers/dataSuppliers";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";

const btnStyles = {
  primary: "bg-[#4F46E5] text-white px-3 py-1 rounded-lg cursor-pointer",
  secondary: "bg-gray-200 text-black px-3 py-1 rounded-lg cursor-pointer",
};

const Suppliers = () => {
  return (
    <div className="p-6 ">
      <div className="pt-4 ">
        <h1 className="text-xl font-semibold">Suppliers</h1>
        <p className="text-[#64748B] my-2">Manage your supplier relationship</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        {suppliersData.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow flex flex-col gap-3"
          >
            <div>
              <h1 className="text-gray-800 font-semibold">{item.name}</h1>
              <span className="flex items-center mt-2 gap-2 text-lg font-semibold text-[#22C55E]">
                <FaStar />
                {item.rating}
              </span>
            </div>

            <div className="flex flex-col text-sm text-gray-600 gap-1">
              <span className="text-lg text-[#64748B] py-1 flex items-center gap-2">
                <span className="text-[#4F46E5] text-2xl">
                  <MdOutlineEmail />
                </span>
                {item.email}
              </span>
              <span className="text-lg text-[#64748B] py-1 flex items-center gap-2">
                <span className="text-[#4F46E5] text-2xl">
                  <MdOutlineLocalPhone />
                </span>
                {item.phone}
              </span>
              <span className="text-lg text-[#64748B] py-1 flex items-center gap-2">
                <span className="text-[#4F46E5] text-2xl">
                  <CiClock2 />
                </span>
                {item.leadTime}
              </span>
              <span className="text-lg text-[#64748B] py-1 flex items-center gap-2">
                <span className="text-[#4F46E5] text-2xl">
                  <BsBoxSeam />
                </span>
                {item.products}
              </span>
            </div>

            <div className="flex gap-3 mt-2 ">
              {item.actions.map((action, i) => (
                <button key={i} className={btnStyles[action.type]}>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#3B82F614] border border-[#3B82F6] mt-8 rounded-2xl ">
        <div className="flex flex-col justify-center items-center py-16">
          <h1 className="font-bold text-2xl">Add New Supplier</h1>
          <p className="text-[#64748B] py-1 px-5">
            Expand your supplier network to improve stock availability
          </p>
          <button className="bg-[#4F46E5]  text-white px-8 py-4 mt-5 md:w-[22em] w-[18em] rounded-2xl cursor-pointer">
            Add Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;

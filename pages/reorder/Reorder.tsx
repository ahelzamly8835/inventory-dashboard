import { BsBoxSeam } from "react-icons/bs";

const Reorder = () => {
  return (
    <div>
      <div className="pt-10 pl-10">
        <h1 className="text-xl font-semibold">Create Reorder</h1>
        <p className="text-[#64748B] my-4">
          User smart suggestions or customize your order
        </p>
      </div>
      <div className="main grid lg:grid-cols-3 gap-4">
        <div className="left bg-white pl-4 py-4 lg:col-span-2 rounded-xl">
          <div className="flex flex-col px-4">
            <h1 className="text-gray-700 font-semibold">Order Details</h1>
            <div className="py-5 mt-4">
              <p className="text-gray-700">Select Product</p>
              <button className="w-full mt-2 flex items-center justify-between px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-white hover:border-gray-300">
                <span className="text-gray-400">Choose a product</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="main bg-white p-4 rounded-xl">
          <h1 className="text-gray-700">Order Summery</h1>
          <div className="flex flex-col justify-center items-center py-4">
            <span>
              <BsBoxSeam className="text-[#64748B] text-5xl" />
            </span>
            <p className="text-[#64748B] pt-4">
              Select a product to view order
            </p>
            <p className="text-[#64748B] ">summery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reorder;

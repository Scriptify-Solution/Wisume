import React from "react";

const Paid = () => {
  return (
    <div>
      <section className="paidSystem mt-28">
        <div className="max-w-7xl mx-auto md:px-[0px] px-[12px]">
          <div className="paid-title relative text-center">
            <span className="subtitle font-semibold text-xl text-transparent inline-block mb-3 ">
              Plans
            </span>
            <h2 className="text-white text-[39px] md:text-7xl font-semibold">
              Choose Your <br />
              Subscription Plan
            </h2>
          </div>
          <div className="paid-inner md:mt-14 py-20">
            <div className="flex flex-wrap">
              <div className="mb-[20px] md:mb-[0px] w-full md:w-1/3">
                <div className="paid-items text-center border-r border-[#ffffff41]">
                  <h3 className="text-4xl text-white font-bold">Basic</h3>
                  <p className="text-sm text-[#ffffff80] font-semibold mt-1 mb-32">
                    Perfect for beginners
                  </p>
                  <p className="text-sm text-[#ffffff80] font-semibold mt-1">
                    Resume Review
                  </p>
                  <h3 className="text-[40px] text-white font-bold">$99/mo</h3>
                  <button className="btn inline-block bg-[#1d3abb] px-[75px] py-2 rounded-md font-semibold mt-3 overflow-hidden">
                    <span className="inline-block">Get Started</span>
                  </button>
                </div>
              </div>
              <div className="mb-[20px] md:mb-[0px] w-full md:w-1/3">
                <div className="paid-items text-center border-r border-[#ffffff41]">
                  <h3 className="text-4xl text-white font-bold">
                    Professional
                  </h3>
                  <p className="text-sm text-[#ffffff80] font-semibold mt-1 mb-32">
                    Build your professional brand
                  </p>
                  <p className="text-sm text-[#ffffff80] font-semibold mt-1">
                    Resume + LinkedIn Optimization
                  </p>
                  <h3 className="text-[40px] text-white font-bold">$199/mo</h3>
                  <button className="btn inline-block bg-[#1d3abb] px-[75px] py-2 rounded-md font-semibold mt-3 overflow-hidden">
                    <span className="inline-block">Get Started</span>
                  </button>
                </div>
              </div>
              <div className="mb-[20px] md:mb-[0px] w-full md:w-1/3">
                <div className="paid-items text-center">
                  <h3 className="text-4xl text-white font-bold">Not sure?</h3>
                  <p className="text-sm text-[#ffffff80] font-semibold mt-1 mb-[148px]">
                    Try our free trial
                  </p>
                  <p className="text-sm text-[#ffffff80] font-semibold mt-1">
                    Get a free task
                    <br /> as a sample
                  </p>
                  <button className="last-btn inline-block border-[#1d3abb] border-2 px-[75px] text-[#1d3abb] py-2 rounded-md font-semibold mt-7 overflow-hidden">
                    <span className="inline-block">Get Started</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- PAID SECTION END  */}
    </div>
  );
};

export default Paid;

import React from "react";
import img1 from "../../../assets/images/1.jpeg";
import img2 from "../../../assets/images/2.jpg";
import img3 from "../../../assets/images/3.jpg";
import img4 from "../../../assets/images/4.jpg";

const Banner = () => {
  return (
    <>
      {/* ---- BANNER SECTION START ---- */}
      <section className="banner bg-[#0F183E] md:py-[40px] py-[50px] w-full">
        <div className="conatiner max-w-7xl mx-auto md:px-[0px] px-[12px]">
          <div className="flex flex-wrap items-center">
            <div className="md:w-1/2 w-full px-[12px] mb-[20px] md:mb-[0px] ">
              <div className="banner-title md:mb-10 mb-7">
                <h4 className="font-semibold text-xl inline-block mb-3  text-transparent bg-clip-text bg-gradient-to-r from-[#bcffa4] via-[#f59571] to-[#f59571]">Our Services</h4>
                <h2 className="text-[50px] md:text-7xl text-white bowlby text-left">
                  First Impressions Matter
                </h2>
              </div>
              <div className="banner-content text-left">
                <div>
                  <span className="bg-[#ffffff0a] text-[14px] md:text-xl text-white inline-block py-6 px-10 rounded-tl-xl rounded-tr-xl rounded-br-xl">
                    Professional Resumes in Minutes
                  </span>
                </div>
                <div>
                  <span className="bg-[#ffffff14] text-[14px] md:text-xl text-white inline-block py-6 px-10 rounded-br-xl">
                    Stand Out with Tailored Cover Letters
                  </span>
                </div>
                <div>
                  <span className="bg-[#ffffff1f] text-[14px] md:text-xl text-white inline-block py-6 px-10 rounded-br-xl rounded-bl-xl">
                    Land Your Dream Job Today
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 w-full px-[12px]">
              <div className="flex flex-wrap">
                <div className="w-1/2">
                  <div className="slider">
                    <div className="slider-img mb-5">
                      <img src={img1} alt="" />
                    </div>
                    <div className="slider-img mb-5">
                      <img src={img2} alt="" />
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="">
                    <div className="slider-img ml-4 mb-5">
                      <img src={img3} alt="" />
                    </div>
                    <div className="slider-img ml-4 mb-5">
                      <img src={img4} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- BANNER SECTION END ---- */}
    </>
  );
};

export default Banner;

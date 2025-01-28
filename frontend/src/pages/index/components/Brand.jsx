import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import brandImg1 from "../../../assets/images/logo_01.png";
import brandImg2 from "../../../assets/images/logo_02.png";
import brandImg3 from "../../../assets/images/logo_03.png";
import brandImg4 from "../../../assets/images/logo_04.png";
import brandImg5 from "../../../assets/images/logo_05.png";

const Brand = () => {
  return (
    <div>
      <section className="brand mb-16 px-4 sm:px-8 md:px-16 py-14 relative">
        <span className="bg-[#ffffff33] absolute bottom-0 left-0 right-0 w-full h-[1px]"></span>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center relative">
            <span className="w-[1px] bg-[#ffffff33] absolute -top-14 -left-14 z-10 h-[167px] hidden lg:block"></span>
            <span className="w-[1px] bg-[#ffffff33] absolute -top-14 -right-14 z-10 h-[167px] hidden lg:block"></span>
            <div className="w-full md:w-1/4 mb-8 md:mb-0">
              <div className="brand-title">
                <h3 className="text-lg text-white font-medium text-center md:text-left">
                  Trusted by <br /> World leading brands
                </h3>
              </div>
            </div>
            <div className="w-full md:w-3/4">
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  280: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                  },
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {[brandImg1, brandImg2, brandImg3, brandImg4, brandImg5].map(
                  (img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`Brand ${index + 1}`}
                        className="h-16 md:h-20 lg:h-24 object-contain"
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* ---- BRAND SECTION END ---- */}
    </div>
  );
};

export default Brand;

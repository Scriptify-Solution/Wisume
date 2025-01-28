import React from "react";
import { useState } from "react";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../../../assets/css/style.css";
import quoteImg from "../../../assets/images/quote.svg";

import testimonialImg1 from "../../../assets/images/user-1.jpg";
import testimonialImg2 from "../../../assets/images/avata-1.png";
import testimonialImg3 from "../../../assets/images/avata-2.png";

const Testimonials = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div>
      <section className="testimonial mt-20">
        <div className="max-w-7xl mx-auto md:px-[0px] px-[12px]">
          <div className="testimonials-title text-center relative">
            <span className="subtitle font-semibold text-xl text-transparent inline-block mb-3">
              Testimonials
            </span>
            <h2 className="text-white bowlby text-[39px] md:text-7xl font-semibold">
              What Our Clients Say
            </h2>
            <p className="text-white text-[18px] md:text-lg mt-3">
              Rated 5.0 out of 5 based on 1,200+ reviews
            </p>
          </div>
          <div className="mt-12">
            <Swiper
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide className="mb-7 md:px-[0px] px-[12px] ">
                <div className="testimonial-content md:pl-[70px] pl-[30px] pt-[30px] pb-[35px] md:pr-[210px] pr-[30px]  relative rounded-lg">
                  <div className="mb-5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={`star-${i}`}
                        className="inline-block text-[#091247e5]"
                      >
                        <FaStar />
                      </span>
                    ))}
                    <span className="inline-block text-white text-sm -translate-y-[2px] ml-2">
                      5.0 Rating
                    </span>
                  </div>
                  <p className="text-white md:text-[26px] text-[18px]">
                    "The resume and cover letter they crafted for me were
                    top-notch! I received several callbacks within days of
                    applying. Highly recommend!"
                  </p>
                  <div className="quoteImg absolute top-20 right-16 opacity-30">
                    <img src={quoteImg} alt="Quote" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="mb-7 md:px-[0px] px-[12px]">
                <div className="testimonial-content  md:pl-[70px] pl-[30px] pt-[30px] pb-[35px] md:pr-[210px] pr-[30px] relative rounded-lg">
                  <div className="mb-5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={`star-${i}`}
                        className="inline-block text-[#091247e5]"
                      >
                        <FaStar />
                      </span>
                    ))}
                    <span className="inline-block text-white text-sm -translate-y-[2px] ml-2">
                      5.0 Rating
                    </span>
                  </div>
                  <p className="text-white md:text-[26px] text-[18px]">
                    "The portfolio they designed for me was outstanding! It
                    showcased my skills perfectly and helped me secure my dream
                    job."
                  </p>
                  <div className="quoteImg absolute top-20 right-16 opacity-30">
                    <img src={quoteImg} alt="Quote" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="mb-7 md:px-[0px] px-[12px]">
                <div className="testimonial-content  md:pl-[70px] pl-[30px] pt-[30px] pb-[35px] md:pr-[210px] pr-[30px] relative rounded-lg">
                  <div className="mb-5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={`star-${i}`}
                        className="inline-block text-[#091247e5]"
                      >
                        <FaStar />
                      </span>
                    ))}
                    <span className="inline-block text-white text-sm -translate-y-[2px] ml-2">
                      5.0 Rating
                    </span>
                  </div>
                  <p className="text-white md:text-[26px] text-[18px]">
                    "Their career consultation services were a game-changer for
                    me. The advice and tips I received were incredibly helpful!"
                  </p>
                  <div className="quoteImg absolute top-20 right-16 opacity-30">
                    <img src={quoteImg} alt="Quote" />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={1}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              breakpoints={{
                280: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              className="mySwiper flex justify-between max-w-[980px] mx-auto"
            >
              <SwiperSlide className="cursor-pointer md:px-[0px] px-[12px]">
                <div className="testimonials-users">
                  <ul className="flex items-center">
                    <li className="w-[64px] h-[64px] rounded-full overflow-hidden">
                      <img src={testimonialImg1} alt="Client 1" />
                    </li>
                    <li className="ml-5">
                      <h4 className="text-white text-lg font-semibold">
                        Mayur Hapani
                      </h4>
                      <p className="text-[#ffffff99] text-sm">
                        Software Engineer
                      </p>
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide className="cursor-pointer md:px-[0px] px-[12px]">
                <div className="testimonials-users">
                  <ul className="flex items-center">
                    <li className="w-[64px] h-[64px] rounded-full overflow-hidden">
                      <img src={testimonialImg2} alt="Client 2" />
                    </li>
                    <li className="ml-5">
                      <h4 className="text-white text-lg font-semibold">
                        Kunal Singh
                      </h4>
                      <p className="text-[#ffffff99] text-sm">
                        Marketing Specialist
                      </p>
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide className="cursor-pointer md:px-[0px] px-[12px]">
                <div className="testimonials-users">
                  <ul className="flex items-center">
                    <li className="w-[64px] h-[64px] rounded-full overflow-hidden">
                      <img src={testimonialImg3} alt="Client 3" />
                    </li>
                    <li className="ml-5">
                      <h4 className="text-white text-lg font-semibold">
                        Anjali Verma
                      </h4>
                      <p className="text-[#ffffff99] text-sm">
                        Graphic Designer
                      </p>
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;

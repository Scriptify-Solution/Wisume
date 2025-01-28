import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Template = () => {
  const { templateList } = useAuth();
  const [template1, setTemplate1] = useState({});
  const [template2, setTemplate2] = useState({});
  const [template3, setTemplate3] = useState({});
  const [template4, setTemplate4] = useState({});

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3500,
    autoplaySpeed: 3500,
    cssEase: "linear",
    centerMode: true, // Optional: This centers the slides
    centerPadding: "0",
    arrows: false,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (templateList) {
      setTemplate1(templateList[0]);
      setTemplate2(templateList[1]);
      setTemplate3(templateList[2]);
      setTemplate4(templateList[3]);
    }
  }, [templateList]);

  const resumeClick = (template) => {
    console.log(template);

    navigate("/create-resume", { state: { template: template } });
  };
  return (
    <div className="bg-primary">
      <section className="slider pt-[100px] relative">
        <div className="slider-inner"></div>
        <h1 className="slider-heading bowlby text-white absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-[112] text-[35px] md:text-[50px] lg:text-[85px] text-center font-bold">
         Award-Winning Templates
        </h1>
        <Slider {...settings}>
          <div>
            <img
              src="/src/assets/images/temp1.jpg"
              alt="Project 1"
              className="pe-5 opacity-20 lg:pe-0"
            />
          </div>
          <div>
            <img
              src="/src/assets/images/2.jpg"
              alt="Project 2"
              className="pe-5 opacity-20 lg:pe-0"
            />
          </div>
          <div>
            <img
              src="/src/assets/images/3.jpg"
              alt="Project 3"
              className="pe-5 opacity-20 lg:pe-0"
            />
          </div>
        </Slider>
      </section>

      <section className="template-section pt-[50px] pb-[80px]">
        <Marquee
          gradient={false}
          speed={100}
          className="text-[220px] bowlby font-didone text-light font-bold"
        >
          <p className="m-0 bowlby">Latest Templates</p>
          <p className="ps-3 bowlby">Latest Templates</p>
        </Marquee>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-3 lg:mx-auto">
            <div className="mx-auto">
              {/* Template 1 */}
              <div className="template-1 mt-10">
                <div className="relative overflow-hidden group">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={
                        template1?.TemplateImg || "/src/assets/images/1.jpeg"
                      }
                      alt="Project 1"
                      className="w-full max-w-[380px] h-[537px] max-h-[537px] object-cover transform transition 
                      duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <h2 className="text-[30px] font-sans text-secondary font-bold pt-5">
                    {template1?.TemplateTitle || "Template 1"}
                  </h2>
                  <span className="text-[14px] font-sans text-dark">
                    Executive
                    <FontAwesomeIcon icon={faMinus} /> Branding
                  </span>

                  {/* Create Template Button */}
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="bg-primary border-2 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg"
                      onClick={() => {
                        resumeClick(template1);
                      }}
                    >
                      Create Template
                    </button>
                  </div>
                </div>
              </div>

              {/* Template 3 */}
              <div className="template-3 mt-14">
                <div className="relative overflow-hidden group">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={template2?.TemplateImg || "/src/assets/images/3.jpg"}
                      alt="Project 2"
                      className="w-full max-w-[380px] h-[537px] max-h-[537px] object-cover transform transition duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <h2 className="text-[30px] font-sans text-secondary font-bold pt-5">
                    {template2?.TemplateTitle || "Template 2"}
                  </h2>
                  <span className="text-[14px] font-sans text-dark">
                    Corporate
                    <FontAwesomeIcon icon={faMinus} /> Design
                  </span>

                  {/* Create Template Button */}
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => resumeClick(template2)}
                      className="bg-primary border-2 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg"
                    >
                      Create Template
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto">
              {/* Template 3 */}
              <div className="template-3">
                <div className="relative group">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={template3?.TemplateImg || "/src/assets/images/3.jpg"}
                      alt="Project 3"
                      className="w-full max-w-[380px] h-[537px] max-h-[537px] object-cover transform transition duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <h2 className="text-[30px] font-sans text-secondary font-bold pt-5">
                    {template3?.TemplateTitle || "Template 3"}
                  </h2>
                  <span className="text-[14px] font-sans text-dark">
                    Modern
                    <FontAwesomeIcon icon={faMinus} /> CV
                  </span>

                  {/* Create Template Button */}
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="bg-primary border-2 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg"
                      onClick={() => resumeClick(template3)}
                    >
                      Create Template
                    </button>
                  </div>
                </div>
              </div>

              {/* Template 4 */}
              <div className="template-1 mt-14">
                <div className="relative group">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={template4?.TemplateImg || "/src/assets/images/4.jpg"}
                      alt="Project 4"
                      className="w-full max-w-[380px] h-[537px] max-h-[537px] object-cover 
                      rounded-xl transform transition duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <h2 className="text-[30px] font-sans text-secondary font-bold pt-5">
                    {template4?.TemplateTitle || "Template 4"}
                  </h2>

                  <span className="text-[14px] font-sans text-dark">
                    Innovative
                    <FontAwesomeIcon icon={faMinus} /> Design
                  </span>

                  {/* Create Template Button */}
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="bg-primary border-2 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg"
                      onClick={() => resumeClick(template4)}
                    >
                      Create Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template;

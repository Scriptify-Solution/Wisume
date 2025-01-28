import React from "react";
import { useState, useEffect } from "react";
import aboutImg from "../../../assets/images/about-1.png";
import iconSvg from "../../../assets/images/award-icon.svg";

const About = () => {
  const AnimatedCounter = ({ start = 0, end = 100, duration = 2000 }) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
      const increment = (end - start) / (duration / 10); // Calculate increment value
      let currentCount = start;

      const timer = setInterval(() => {
        currentCount += increment;
        if (
          (increment > 0 && currentCount >= end) ||
          (increment < 0 && currentCount <= end)
        ) {
          clearInterval(timer);
          setCount(end); // Set final count value
        } else {
          setCount(currentCount);
        }
      }, 10); // Update every 10ms

      return () => clearInterval(timer); // Cleanup interval
    }, [start, end, duration]);

    return <h1>{Math.round(count)}</h1>;
  };

  return (
    <div>
      {/* ---- ABOUT SECTION START ---- */}

      <section className="about py-10 md:mt-44">
        <div className="max-w-7xl mx-auto md:px-[0px] px-[12px]">
          <div className="flex flex-wrap items-center">
            <div className="md:w-5/12 w-full">
              <div className="about-title">
                <div className="about-title-img w-[320px] h-[320px] mx-auto rounded-full relative overflow-hidden">
                  <img
                    src={aboutImg}
                    alt="About Image"
                    className="inline-block w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-7/12">
              <span className="font-semibold text-xl text-transparent inline-block mb-3 bg-clip-text bg-gradient-to-r from-[#bcffa4] via-[#f59571] to-[#f59571]">
                About Us
              </span>
              <div className="about-items">
                <div className="border inline-block px-7 py-5 rounded-lg border-white/30 mb-6">
                  <ul className="flex items-center">
                    <li>
                      <img src={iconSvg} alt="Icon" />
                    </li>
                    <li className="ml-6">
                      <h3 className="text-white text-lg font-bold">
                        Your Career Partner
                      </h3>
                      <p className="text-sm text-white/60">
                        Dedicated to helping you achieve your career goals.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="about-content">
                  <p className="md:text-[26px] text-[19px] text-white/50">
                    Hello! We’re <span className="text-white">ResumePro</span>,
                    your trusted partner for creating{" "}
                    <span className="text-white">professional resumes</span>,{" "}
                    <span className="text-white">tailored cover letters</span>,
                    and career-building resources. With over{" "}
                    <span className="text-white">a decade of experience</span>,
                    we’ve empowered thousands of job seekers to land their dream
                    jobs.
                  </p>
                </div>
                <div className="mt-10">
                  <ul className="flex justify-between">
                    {[
                      { value: 500, label: "Resumes Created" },
                      {
                        value: 10,
                        appendPlus: true,
                        label: "Years of Experience",
                      },
                      { value: 300, label: "Satisfied Clients" },
                    ].map((item, index) => (
                      <li key={`counter-${index}`}>
                        <h4 className="font-bold flex text-[30px] md:text-[54px] text-transparent bg-clip-text bg-gradient-to-r from-[#bcffa4] via-[#f59571] to-[#f59571]">
                          <AnimatedCounter
                            start={0}
                            end={item.value}
                            duration={3000}
                          />
                          {item.appendPlus && "+"}
                        </h4>
                        <span className="text-white/50 text-md">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- ABOUT SECTION END ---- */}
    </div>
  );
};

export default About;

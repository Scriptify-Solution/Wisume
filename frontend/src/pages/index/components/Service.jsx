import React, { useState } from "react";

const Service = () => {
  const items = [
    {
      index: "1",
      title: "Professional Resumes",
      content:
        "Create customized, ATS-optimized resumes that help you stand out in your job applications. Includes ATS-friendly formats, customizable templates, and instant download options.",
    },
    {
      index: "2",
      title: "Tailored Cover Letters",
      content:
        "Craft personalized cover letters designed to impress recruiters and highlight your strengths. Features professionally written content, customizable layouts, and industry-specific targeting.",
    },
    {
      index: "3",
      title: "Portfolio Design",
      content:
        "Showcase your skills and achievements with a professional online portfolio that grabs attention. Includes responsive design, key project highlights, and integrated resume links.",
    },
    {
      index: "4",
      title: "Career Consultation",
      content:
        "Get expert advice and tips to enhance your job applications and succeed in interviews. Services include resume review and feedback, interview preparation tips, and career growth strategies.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div>
      {/* ---- SERVICES SECTION START ---- */}

      <section className="services mb-16">
        <div className="max-w-7xl mx-auto md:px-[0px] px-[12px]">
          <div className="flex flex-wrap">
            <div className="md:w-1/2 md:p-[0px] p-[12px] w-full">
              <div className="relative md:pl-16 md:pt-16">
                <h5 className="font-semibold text-xl inline-block mb-3  text-transparent bg-clip-text bg-gradient-to-r from-[#bcffa4] via-[#f59571] to-[#f59571]">
                  Services
                </h5>
                <h3 className="text-[39px] md:text-7xl font-bold bowlby text-white mb-3">
                  What We <br /> Offer.
                </h3>
                <p className="md:text-[24px] text-[19px] md:text-lg text-white/70">
                  We help job seekers create stunning resumes and cover letters
                  that stand out. From ATS-friendly designs to custom templates,
                  we’ve got you covered.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 w-full ">
              <div className="services-content">
                <div className="accordion md:max-w-[600px] mx-auto">
                  {items?.map((item, index) => (
                    <div
                      key={index}
                      className="accordion-item mb-3 text-white border-b border-white/20"
                    >
                      <div
                        className="accordion-header font-semibold text-4xl cursor-pointer p-3 text-white bg-transparent"
                        onClick={() => handleToggle(index)}
                      >
                        <span className="text-base align-text-top pr-4 text-white/70 translate-y-2 inline-block">
                          {item.index}
                        </span>
                        <span className="md:text-[36px] text-[25px]">
                          {item.title}
                        </span>
                      </div>
                      {activeIndex === index && (
                        <div className="accordion-content p-3 bg-transparent md:ml-7 ml-[0px] text-base text-white/70 animate-fadeIn transition-all duration-300">
                          {item.content}
                          <ul className="text-white">
                            <li>{item.list1}</li>
                            <li>{item.list2}</li>
                            <li>{item.list3}</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <marquee
          className="-rotate-3 py-3 mt-10 bg-[#1d3abb] text-[#0F183E] text-3xl font-semibold"
          behavior="scroll"
          direction="left"
          scrollamount="10"
          loop="infinite"
        >
          Resume creation services | Tailored cover letters | Professional
          templates | Job application tools | Resume creation services |
          Tailored cover letters | Professional templates | Job application
          tools
        </marquee>
      </section>

      {/* ---- SERVICES SECTION END ---- */}
    </div>
  );
};

export default Service;

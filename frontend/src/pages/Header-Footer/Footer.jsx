import React from "react";
import { Button } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles

const Footer = () => {
  return (
    <section className="pt-[120px] pb-[40px] footer-bg relative bg-[#162251] ">
      <div className="container mx-auto">
        <div className="footer-hdeading mb-[120px]">
          <h2 className="text-[40px] bowlby md:text-[70px] lg:text-[100px]  text-white text-center font-bold">
            Let's talk about <br />
            the next big thing
          </h2>
        </div>

        <div className="row ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
            <Button className="flex items-center justify-center w-full h-[120px] bg-white rounded-full">
              <h2 className="text-center text-[28px] font-bold font-sans">
                Discuss Project
              </h2>
            </Button>

            <Button className="flex items-center justify-center w-full h-[120px] bg-white rounded-full border-0">
              <h2 className="text-center text-[28px] font-bold font-sans  ">
                Write a Message
              </h2>
            </Button>
          </div>
        </div>
        <div className="sub-footer md:flex justify-between pt-[80px] text-center">
          <p className="text-[14px] text-[#FFFFFF80] font-sans">
            ©2024 Wisume, All Rights Reserved •{" "}
            <span className="text-white">Credits</span>{" "}
          </p>

          <p className="text-[14px] text-[#FFFFFF80] font-sans border-b inline-block">
            2024 Wisume
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;

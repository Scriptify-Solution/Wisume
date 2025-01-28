import React, { useEffect } from "react";
import About from "./components/About";
import Banner from "./components/Banner";
import Brand from "./components/Brand";
import Service from "./components/Service";
import Testimonials from "./components/Testimonials";
import Paid from "./components/Paid";

export const Index = () => {
  return (
    <>
      <Banner />
      <Brand />
      <Service />
      <About />
      <Testimonials />
      <Paid />
    </>
  );
};

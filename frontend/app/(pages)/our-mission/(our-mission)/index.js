"use client";

import Store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import BreadCrumb from "@/components/Common/BreadCrumb";
import Cart from "@/components/Header/Offcanvas/Cart";
import Context from "@/context/Context";

import Separator from "@/components/Common/Separator";
// import FooterOne from "@/components/Footer/Footer-One";
import MainFooter from "@/components/Footer/Footer";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
// import AdmissionArea from "@/components/Admission-Guide/AdmissionArea";
import OurMissionArea from "@/components/Our-Mission/OurMission";
import OurMissionContact from "@/components/Our-Mission/OurMissionContact";
// import AdmissionContact from "@/components/Admission-Guide/AdmissionContact";

const OurMissionPage = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MobileMenu />
          <Cart />
          <BreadCrumb title="Our Mission" text="Our Mission" />

          <div className="rbt-admission-area bg-color-white rbt-section-gapTop">
            <div className="container">
              <OurMissionArea />
            </div>
          </div>

          <div className="rbt-conatct-area bg-color-white pt--60 rbt-section-gapBottom">
            <div className="container">
              <OurMissionContact />
            </div>
          </div>

          <Separator />
          <MainFooter />
        </Context>
      </Provider>
    </>
  );
};

export default OurMissionPage;

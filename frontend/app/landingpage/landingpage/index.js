"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
// import FooterThree from "@/components/Footer/Footer-Three";
import MainFooter from "@/components/Footer/Footer";
import BrandThree from "@/components/Brand/Brand-Three";
import CallToActionSix from "@/components/Call-To-Action/CallToAction-Six";
import AboutSix from "@/components/Abouts/About-Six";
import ServiceTwelve from "@/components/Services/Service-Twelve";
import TeamTen from "@/components/Team/TeamTen";
import Separator from "@/components/Common/Separator";
// import Banner from "@/components/About-Us-02/Banner";
import LandingPageBanner from "@/components/Landing-page/LandingPageBanner";
// import Video from "@/components/About-Us-02/Video";
import LandingPageVideo from "@/components/Landing-page/LandingPageVideo";

const LandingpageDesign = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MobileMenu />
          <Cart />

          <div className="rbt-banner-area rbt-banner-8 variation-02">
            <div className="container">
              <LandingPageBanner />
            </div>
          </div>

          <LandingPageVideo />

          <div className="rbt-call-to-action-area rbt-section-gap bg-gradient-8">
            <div className="rbt-callto-action rbt-cta-default style-6">
              <CallToActionSix />
            </div>
          </div>

          <div className="rbt-brand-area bg-color-white rbt-section-gap">
            <BrandThree />
          </div>
          <Separator />

          <MainFooter />
        </Context>
      </Provider>
    </>
  );
};

export default LandingpageDesign;

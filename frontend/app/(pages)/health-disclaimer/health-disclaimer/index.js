"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

// import FooterOne from "@/components/Footer/Footer-One";
import MainFooter from "@/components/Footer/Footer";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Instagram from "@/components/Instagram/Instagram";
// import PrivacyPolicy from "@/components/Privacy-Policy/PrivacyPolicy";
import HealthDisclaimer from "@/components/health-disclaimer/HealthDisclaimer";

const HealthDisclaimerPage = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MobileMenu />
          <Cart />
          <HealthDisclaimer />
          <MainFooter />
        </Context>
      </Provider>
    </>
  );
};

export default HealthDisclaimerPage;

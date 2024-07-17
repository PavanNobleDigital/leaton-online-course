"use client";

import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import MobileMenu from "@/components/Header/MobileMenu";
import HeaderTopBar from "@/components/Header/HeaderTopBar/HeaderTopBar";
import HeaderStyleNine from "@/components/Header/HeaderStyle-Nine";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import MainFooter from "@/components/Footer/Footer";
import ClassicLms from "@/components/05-classic-lms/05-ClassicLms";
import HomePageLms from "@/components/Home-Page/Home-page";
import LandingPageLms from "@/components/LandingPage/LandingPage";
import { useSelector } from 'react-redux';


const HomepageLmsContent = ({ getAllBlogs }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Context>
      { isAuthenticated ?
      <>
        <MobileMenu />
        <HeaderStyleTen headerSticky="rbt-sticky" headerType={true} />
        <HomePageLms blogdata={getAllBlogs} />
        
        </>
      : <>
      
      <LandingPageLms blogdata={getAllBlogs} />
      </>}
      <Cart />

      <Separator />
      <MainFooter />
      {/* <FooterOne /> */}
    </Context>
  );
};

const HomeLmsPage = ({ getAllBlogs }) => {
  return (
    <>
      <Provider store={Store}>
      <HomepageLmsContent getAllBlogs={getAllBlogs} />
      </Provider>
    </>
  );
};

export default HomeLmsPage;

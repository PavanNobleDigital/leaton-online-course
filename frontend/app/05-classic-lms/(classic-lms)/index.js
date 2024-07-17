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
import ClassicLms from "@/components/05-classic-lms/05-ClassicLms";
import HomePageLms from "@/components/Home-Page/Home-page";
import LandingPageLms from "@/components/LandingPage/LandingPage";
import { useSelector } from 'react-redux';


const ClassicLmsContent = ({ getAllBlogs }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Context>
      { isAuthenticated ?
      <>
        <MobileMenu />
        {/* <HeaderStyleNine headerType="" /> */}
        <HeaderStyleTen headerSticky="rbt-sticky" headerType={true} />
        <HomePageLms blogdata={getAllBlogs} />
        
        </>
      : <>
      
      <LandingPageLms blogdata={getAllBlogs} />
      </>}
      
      {/* <ClassicLms blogdata={getAllBlogs} /> */}
      <Cart />

      <Separator />
      <FooterOne />
    </Context>
  );
};

const ClassicLmsPage = ({ getAllBlogs }) => {
  return (
    <>
      <Provider store={Store}>
      <ClassicLmsContent getAllBlogs={getAllBlogs} />
      </Provider>
    </>
  );
};

export default ClassicLmsPage;

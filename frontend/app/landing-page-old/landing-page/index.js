"use client";

import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import MobileMenu from "@/components/Header/MobileMenu";
import HeaderTopBar from "@/components/Header/HeaderTopBar/HeaderTopBar";
import HeaderStyleNine from "@/components/Header/HeaderStyle-Nine";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import ClassicLms from "@/components/05-classic-lms/05-ClassicLms";
import { useSelector } from "react-redux";

import Landing from "@/components/LandingPage/LandingPage";
import Homepage from "@/components/Homepage/Homepage"


const LandingPageContent = ({ getAllBlogs }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
    return (

          <Context>
          { isAuthenticated ?
            <>
              <MobileMenu />
              <HeaderTopBar />
              <HeaderStyleNine headerType="" />
              <Homepage blogdata={getAllBlogs} />
              </>
            : <>
              <MobileMenu />
              <HeaderTopBar />
              <HeaderStyleNine headerType="" />
              <Landing blogdata={getAllBlogs} />
            </>}
           
  
  
            
            <Cart />
  
            <Separator />
            <FooterOne />
          </Context>
    );
  };

const LandingPage = ({ getAllBlogs }) => {

  
  return (
    <>
      <Provider store={Store}>
        <LandingPageContent getAllBlogs={getAllBlogs}></LandingPageContent>
      </Provider>
    </>
  );
};

export default LandingPage;

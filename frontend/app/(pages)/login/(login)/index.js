"use client";
import { useEffect } from 'react';
import BreadCrumb from "@/components/Common/BreadCrumb";
// import FooterOne from "@/components/Footer/Footer-One";
import MainFooter from '@/components/Footer/Footer';
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Login from "@/components/Login/Login";
import Context from "@/context/Context";
import Store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const LoginPageContent = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const router = useRouter();
  useEffect(() => {
    // redirect to home if already logged in
    if (isAuthenticated) {
      router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context>
      { isAuthenticated ?
      <>
        <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
        <MobileMenu />
        <Cart />
      </>
      : <></>}
      <BreadCrumb title="Login & Register" text="Login & Register" />

      <div className="rbt-elements-area bg-color-white rbt-section-gap">
        <div className="container">
          <div className="row gy-5 row--30">
            <Login />
          </div>
        </div>
      </div>

        <MainFooter />
      {/* <FooterOne /> */}
    </Context>
  );
};

const LoginPage = () => {
  return (
    <>
      <Provider store={Store}>
      <LoginPageContent />
      </Provider>
    </>
  );
};

export default LoginPage;

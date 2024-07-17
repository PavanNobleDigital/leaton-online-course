"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Dashboard from "@/components/Student/Dashboard";
// import StudentDashboardHeader from "@/components/Student/StudentDashboardHeader";
import MyDashboardHeader from "@/components/Student/MyDashboardHeader";
// import StudentDashboardSidebar from "@/components/Student/StudentDashboardSidebar";
import MyDashboardSidebar from "@/components/Student/MyDashboardSidebar";

const MyAccountDashboardContent = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const token = useSelector(state => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (token == null) {
      router.push('/');
    }
    const fetchData = async (token) => {
      try {
        const response = await fetch('/api/user_details/',
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`
            }
          }
        ); // Replace with your API endpoint
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(token);
  }, [token]);

  if (!dashboardData) {
    return 'loading...'
  }

  return <Context>
    <MobileMenu />
    <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
    <Cart />

    <div className="rbt-page-banner-wrapper">
      <div className="rbt-banner-image" />
    </div>
    <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <MyDashboardHeader user={dashboardData.userDetails[0]}/>

            <div className="row g-5">
              <div className="col-lg-3">
                <MyDashboardSidebar user={dashboardData.userDetails[0]}/>
              </div>

              <div className="col-lg-9">
                <Dashboard user={dashboardData.userDetails[0]}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Separator />
    <FooterOne />
  </Context>
}


const MyAccountDashboard = () => {
  return (
    <>
      <Provider store={Store}>
        <MyAccountDashboardContent />
      </Provider>
    </>
  );
};

export default MyAccountDashboard;

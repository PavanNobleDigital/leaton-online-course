"use client";

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Separator from "@/components/Common/Separator";
// import FooterOne from "@/components/Footer/Footer-One";
import MainFooter from "@/components/Footer/Footer";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Profile from "@/components/Student/Profile";
// import StudentDashboardHeader from "@/components/Student/StudentDashboardHeader";
// import UserDashboardHeader from "@/components/User-Profile/UserDashboardHeader";
// import StudentDashboardSidebar from "@/components/Student/StudentDashboardSidebar";
// import UserDashboardSidebar from "@/components/User-Profile/UserDashboardSidebar";

import MyDashboardHeader from "@/components/Student/MyDashboardHeader";
import MyDashboardSidebar from "@/components/Student/MyDashboardSidebar";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

const UserProfile = () => {
  const [profiledData, setProfileData] = useState(null);
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
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching User Information:', error);
      }
    };
    fetchData(token);
  }, [token]);

  if (!profiledData) {
    return 'loading...'
  }

  return (
    <>
      <Provider store={Store}>
        <Context>
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
                  <MyDashboardHeader user={profiledData.userDetails[0]} />

                  <div className="row g-5">
                    <div className="col-lg-3">
                      <MyDashboardSidebar user={profiledData.userDetails[0]} />
                    </div>

                    <div className="col-lg-9">
                      <Profile user={profiledData.userDetails[0]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />
          <MainFooter />
        </Context>
      </Provider>
    </>
  );
};


const UserProfileDashboard = () => {
  return (
    <>
      <Provider store={Store}>
        <UserProfile />
      </Provider>
    </>
  );
};

export default UserProfileDashboard;

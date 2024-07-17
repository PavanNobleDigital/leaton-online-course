"use client";

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Setting from "@/components/Student/Settings";
import UserSettingForm from '@/components/app/user/UserSettings';
// import StudentDashboardHeader from "@/components/Student/StudentDashboardHeader";
// import StudentDashboardSidebar from "@/components/Student/StudentDashboardSidebar";
import MyDashboardHeader from "@/components/Student/MyDashboardHeader";
import MyDashboardSidebar from "@/components/Student/MyDashboardSidebar";
import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

const UserSetting = () => {
  const [settingsData, setSettingsData] = useState(null);
  const token = useSelector(state => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (token == null) {
      router.push('/');
    }
    const fetchData = async (token) => {
      try {
        const response = await fetch('/api/user_profile_settings/',
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`
            },
            method: "GET"
          }
        ); // Replace with your API endpoint
        const data = await response.json();
        setSettingsData(data);
      } catch (error) {
        console.error('Error fetching User Information:', error);
      }
    };
    fetchData(token);
  }, [token]);

  if (!settingsData) {
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
          <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom user_settings_page">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <MyDashboardHeader user={settingsData.userDetails} />

                  <div className="row g-5">
                    <div className="col-lg-3">
                      <MyDashboardSidebar user={settingsData.userDetails} />
                    </div>

                    <div className="col-lg-9">
                      <UserSettingForm userprofile={settingsData.userDetails} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />
          <FooterOne />
        </Context>
      </Provider>
    </>
  );
};



const UserSettingDashboard = () => {
  return (
    <>
      <Provider store={Store}>
        <UserSetting />
      </Provider>
    </>
  );
};

export default UserSettingDashboard;

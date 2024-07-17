"use client";


import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
// import OrderHistory from "@/components/Student/OrderHistory";
import UserOrderHistoryTable from "@/components/Student/UserOrderHistory";
// import StudentDashboardHeader from "@/components/Student/StudentDashboardHeader";
// import StudentDashboardSidebar from "@/components/Student/StudentDashboardSidebar";
import MyDashboardHeader from "@/components/Student/MyDashboardHeader";
import MyDashboardSidebar from "@/components/Student/MyDashboardSidebar";
import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

const UserOrderHistory = () => {
  const [orderData, setOrderData] = useState(null);
  const token = useSelector(state => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (token == null) {
      router.push('/');
    }
    const fetchData = async (token) => {
      try {
        const response = await fetch('/api/user_order_history/',
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`
            }
          }
        ); // Replace with your API endpoint
        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error('Error fetching User Order History Information:', error);
      }
    };
    fetchData(token);
  }, [token]);

  if (!orderData) {
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
                  <MyDashboardHeader user={orderData.userDetails}/>

                  <div className="row g-5">
                    <div className="col-lg-3">
                      <MyDashboardSidebar user={orderData.userDetails} />
                    </div>

                    <div className="col-lg-9">
                      <UserOrderHistoryTable  order_history={orderData.order_details}/>
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


const UserOrderHistoryTab = () => {
  return (
    <>
      <Provider store={Store}>
        <UserOrderHistory />
      </Provider>
    </>
  );
};

export default UserOrderHistoryTab;

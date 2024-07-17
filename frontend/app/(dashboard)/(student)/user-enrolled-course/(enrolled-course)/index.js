"use client";

import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
// import EnrolledCourses from "@/components/Student/Eenrolled-Course";
import UserEnrolledCourses from "@/components/Student/UserEnrolledCourse";
// import StudentDashboardHeader from "@/components/Student/StudentDashboardHeader";
// import StudentDashboardSidebar from "@/components/Student/StudentDashboardSidebar";
import MyDashboardHeader from "@/components/Student/MyDashboardHeader";
import MyDashboardSidebar from "@/components/Student/MyDashboardSidebar";
import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const UserCourse = () => {
  const [userCourseData, setUserCourseData] = useState(null);
  const token = useSelector(state => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (token == null) {
      router.push('/');
    }
    const fetchData = async (token) => {
      try {
        const response = await fetch('/api/user_enrolled_courses/',
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`
            }
          }
        ); // Replace with your API endpoint
        const data = await response.json();
        setUserCourseData(data);
      } catch (error) {
        console.error('Error fetching User Information:', error);
      }
    };
    fetchData(token);
  }, [token]);

  if (!userCourseData) {
    return 'loading...'
  }




  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <Cart />

          <div className="rbt-page-banner-wrapper cccc">
            <div className="rbt-banner-image" />
          </div>
          <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <MyDashboardHeader user={userCourseData.userDetails} />

                  <div className="row g-5">
                    <div className="col-lg-3">
                      <MyDashboardSidebar user={userCourseData.userDetails} />
                    </div>

                    <div className="col-lg-9">
                      <UserEnrolledCourses enrolledcourses={userCourseData.enrolledCourses} completedCourse={userCourseData.completedCourses}/>
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



const UserCourseDashboard = () => {
  return (
    <>
      <Provider store={Store}>
        <UserCourse />
      </Provider>
    </>
  );
};

export default UserCourseDashboard;


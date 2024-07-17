"use client";

import { useEffect, useState } from "react";

import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import CategoryHead from "@/components/Category/CategoryHead";
import Pagination from "@/components/Common/Pagination";
// import FooterOne from "@/components/Footer/Footer-One";
import MainFooter from "@/components/Footer/Footer";

import CourseDetails from "../../../data/course-details/courselist.json";

import CourseTab from "@/components/Category/Filter/CourseTab";
import CourseSidebar from "@/components/Category/Filter/CourseSidebar";
import HeaderStyleNine from "@/components/Header/HeaderStyle-Nine";

const OurCoursesWithSidebarLayout = () => {
  const [courses, setCourse] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost/api/courselist/');
      const data = await response.json();
      setCourse(data.courseDetails.slice(0, 12));
      setTotalPages(Math.ceil(data.courseDetails.length / 6));
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const startIndex = (page - 1) * 6;
  const getSelectedCourse = courses.slice(startIndex, startIndex + 6);

  const handleClick = (num) => {
    setPage(num);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType={true} />
          <MobileMenu />
          <Cart />

          <CategoryHead category={courses} />
          <div className="rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="container">
              <div className="row row--30 gy-5">
                <div className="col-lg-3 order-2 order-lg-1">
                  <p>Testing code</p>
                  <CourseSidebar />
                </div>
                <div className="col-lg-9 order-1 order-lg-2">
                  <CourseTab course={getSelectedCourse} />
                </div>
              </div>

              {courses.length > 6 ? (
                <div className="row">
                  <div className="col-lg-12 mt--60">
                    <Pagination
                      totalPages={totalPages}
                      pageNumber={page}
                      handleClick={handleClick}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <MainFooter />
        </Context>
      </Provider>
    </>
  );
};

export default OurCoursesWithSidebarLayout;

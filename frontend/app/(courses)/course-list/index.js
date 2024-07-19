"use client";

import React, { useEffect, useState } from "react";

// import CourseDetails from "../../../data/course-details/courseData.json";
import CourseDetails from "../../../data/course-details/courselist.json";

import { Provider } from "react-redux";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Context from "@/context/Context";
import Store from "@/redux/store";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
// import FooterOne from "@/components/Footer/Footer-One";
import MainFooter from "@/components/Footer/Footer";
import CategoryHead from "@/components/Category/CategoryHead";
import CourseTab from "@/components/Category/Filter/CourseTab";

const OurCoursesTabPage = () => {

  const [courses, setCourse] = useState([]);
  const token = useSelector(state => state.auth.token);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (token == null) {
      router.push('/');
    }
    const fetchCourses = async (token) => {
      try {
        const response = await fetch('/api/courses/all/',
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`
            }
          }
        ); // Replace with your API endpoint
        const data = await response.json();
      setCourse(data.courseDetails.slice(0, 12));
      setTotalPages(Math.ceil(data.courseDetails.length / 6));
      } catch (error) {
        console.error('Error fetching course list:', error);
      }
    };
    fetchCourses(token);
  }, [token]);






const startIndex = (page - 1) * 6;
const getAllCourse = courses.slice(startIndex, startIndex + 6);




const [courseFilter, setCourseFilter] = useState(getAllCourse);

const filterItem = (types) => {
  const updateItem = getAllCourse.filter((curElm) => {
    return curElm.courseType === types;
  });

  if (types !== "All Course") {
    setCourseFilter(updateItem);
  } else {
    setCourseFilter(getAllCourse);
  }
};


  // let getAllCourse = JSON.parse(
  //   JSON.stringify(CourseDetails.courseDetails.slice(0, 12))
  // );
  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType={true} />
          <MobileMenu />
          <Cart />

          <CategoryHead
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
            filterItem={filterItem}
            category={getAllCourse}
          />

          <div className="rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="inner">
              <div className="container">
                <CourseTab course={getAllCourse} />
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


const OurCoursesTabPageProvider = () => {
  return (
    <>
      <Provider store={Store}>
        <OurCoursesTabPage />
      </Provider>
    </>
  );
};

export default OurCoursesTabPageProvider;

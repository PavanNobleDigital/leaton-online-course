"use client";


import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
// import FooterOne from "@/components/Footer/Footer-One";
import MainFooter from "@/components/Footer/Footer";
import CourseHead from "@/components/Course-Details/Course-Sections/course-head";
import CoursePageHead from "@/components/app/course/detailspage/course-page-head";
// import CourseDetailsHead from "@/components/app/course/detailspage/course-details-head";
// import CourseDetailsOne from "@/components/Course-Details/CourseDetails-One";
import CourseInformation from "@/components/Course-Details/CourseInformation";
import CourseActionBottom from "@/components/Course-Details/Course-Sections/Course-Action-Bottom";
import SimilarCourses from "@/components/Course-Details/Course-Sections/SimilarCourses";

const SingleCourseContent = ({ getParams }) => {
  const postId = parseInt(getParams.courseId);
  const token = useSelector(state => state.auth.token);
  const [checkMatch, setCheckMatch] = useState(null);
  const getCourse = async (postId) => {
    try {
      const response = await fetch(
        `/api/coursedetails/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
          }
        }
      );
      const data = await response.json();
      setCheckMatch(data.courseDetails.find((course) => course.id === postId));
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  //pavan code

  useEffect(() => {
    getCourse(postId)
  }, [postId]);

  if (!checkMatch) {
    return "loading..."
  }

  return <Context>
            <MobileMenu />
            <HeaderStyleTen headerSticky="" headerType={true} />
            <Cart />

            <div className="rbt-breadcrumb-default rbt-breadcrumb-style-3">
              {/* <CourseHead
                checkMatch={checkMatch !== undefined ? checkMatch : ""}
              /> */}
              <CoursePageHead
                checkMatch={checkMatch !== undefined ? checkMatch : ""}
              />
              

            </div>

            <div className="rbt-course-details-area ptb--60">
              <div className="container">
                <div className="row g-5">
                  {/* <CourseDetailsOne
                  checkMatchCourses={checkMatch !== undefined ? checkMatch : ""}
                /> */}
                  <CourseInformation
                    checkMatchCourses={checkMatch !== undefined ? checkMatch : ""}
                  />
                </div>
              </div>
            </div>

            <CourseActionBottom
              checkMatchCourses={checkMatch !== undefined ? checkMatch : ""}
            />

            <div className="rbt-related-course-area bg-color-white pt--60 rbt-section-gapBottom">
              <SimilarCourses
                checkMatchCourses={
                  checkMatch !== undefined ? checkMatch?.similarCourse : ""
                }
              />
            </div>

            <Separator />
            <MainFooter />
          </Context>;
};

const SingleCourse = ({ getParams }) => {

  return (
    <>
      <Provider store={Store}>
        <SingleCourseContent getParams={getParams}/>
      </Provider>
    </>
  );
};

export default SingleCourse;

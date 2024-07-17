"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import CourseData from "../../../data/course-details/courseData.json";
// import UserProfile from "@/components/User-Profile/User-Profile";
import TrainerProfile from "@/components/User-Profile/Trainer-Profile";
import Biography from "@/components/User-Profile/User-Biography";
import UserCourses from "@/components/User-Profile/User-Courses";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";

const SingleProfile = ({ getParams }) => {
  const router = useRouter();
  const trainerId = parseInt(getParams.trainerId);
  let getCourse;


/*

MAYANK TO GET CONTENT FROM THE API BELOW:

API:  http://localhost/api/trainer/<trainer_id>/
Type: GET

See full API details here:
https://galacticitsolutions.atlassian.net/jira/core/projects/LOCA/board?selectedIssue=LOCA-32


Here 'checkMatchProfile' is being passed as a props into the child module. 

In my respone JSON, there is no 'courseDetails', instead is 'trainerDetails', which the below code catures, but I need the code to use my version of json please.


*/
// const [trainer, setTrainer] = useState([]);
// const fetchTrainer = async () => {
//   try {
//     const response = await fetch('http://localhost/api/trainer/1', { 
//       method: 'get', 
//           headers: new Headers({
//               'Authorization': 'Token b3381cd7d1a2e1add1e9b866eb02dd35c2fc67fe'
//           })
//       });
//     const data = await response.json();
//     console.log('Trainer ID 2: ', trainerId);
//     console.log('My api: ', data);
//     setTrainer(data);
    
//   } catch (error) {
//     console.error('Error fetching Trainer Details:', error);
//   }
// };

// useEffect(() => {
//   fetchTrainer();
// }, []);

  // const checkMatchProfile = trainer;

  getCourse = JSON.parse(JSON.stringify(CourseData.courseDetails));

  const checkMatchProfile = getCourse.find((course) => course.id === trainerId);

  useEffect(() => {
    if (trainerId && checkMatchProfile === undefined) {
      // console.log('Testing BASE');
      router.push("/trainer/1");
    }
    // console.log('Related Course: ', checkMatchProfile.relatedCourse);
  }, [checkMatchProfile, router]);

  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="" headerType={true} />
          <MobileMenu />
          <Cart />

          <div className="rbt-page-banner-wrapper">
            <div className="rbt-banner-image"></div>
          </div>
          <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="container">
              <div className="row">
                {/* <UserProfile checkMatchProfile={checkMatchProfile} /> */}
                <TrainerProfile checkMatchProfile={checkMatchProfile} />
                {/* <Biography checkMatchProfile={checkMatchProfile} /> */}
              </div>
              <div className="rbt-profile-course-area mt--60">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="sction-title">
                      <h2 className="rbt-title-style-3">Courses</h2>
                    </div>
                  </div>
                </div>
                <div className="row g-5 mt--5">
                {checkMatchProfile &&
                    checkMatchProfile.relatedCourse.map((data, index) => (
                      <UserCourses {...data} key={index} relatedCourse={data} />
                    ))}
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

export default SingleProfile;

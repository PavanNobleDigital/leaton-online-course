"use client";

import { useEffect, useState } from "react";

import LessonSidebar from "@/components/Lesson/LessonSidebar";
import LessonPagination from "@/components/Lesson/LessonPagination";
import LessonTop from "@/components/Lesson/LessonTop";
import LessonQuizResult from "@/components/Lesson/LessonQuizResult";

const LessonQuizResultLayout = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <div className="rbt-lesson-area bg-color-white">
        <div className="rbt-lesson-content-wrapper">
          <div
            className={`rbt-lesson-leftsidebar ${
              sidebar ? "" : "sibebar-none"
            }`}
          >
            <LessonSidebar />
          </div>

          <div className="rbt-lesson-rightsidebar overflow-hidden">
            <LessonTop
              sidebar={sidebar}
              setSidebar={() => setSidebar(!sidebar)}
            />

            <div className="inner">
              <div className="content">
                <div className="section-title">
                  <p className="mb--10">Quiz</p>
                  <h5>Musical Theory</h5>
                </div>
                <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
                  <LessonQuizResult />
                </div>
              </div>
            </div>

            <LessonPagination
              urlPrev="/lesson-quiz"
              urlNext="/lesson-assignments"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonQuizResultLayout;

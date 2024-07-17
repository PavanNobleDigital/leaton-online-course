import React from "react";

import LessonQuizData from "../../data/lesson.json";

const LessonQuizResult = () => {
  return (
    <>
      <table className="rbt-table table table-borderless">
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Qus</th>
            <th>TM</th>
            <th>CA</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {LessonQuizData &&
            LessonQuizData.lessonQuiz.map((data, index) => (
              <tr key={index}>
                <th>
                  <p className="b3 mb--5">{data.date}</p>
                </th>
                <td>
                  <p className="b3">{data.qus}</p>
                </td>
                <td>
                  <p className="b3">{data.tm}</p>
                </td>
                <td>
                  <p className="b3">{data.ca}</p>
                </td>
                <td>
                  <span
                    className={`rbt-badge-5 ${
                      data.isPass
                        ? "bg-color-success-opacity color-success"
                        : "bg-color-danger-opacity color-danger"
                    }`}
                  >
                    {data.isPass ? "Pass" : "Fail"}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default LessonQuizResult;

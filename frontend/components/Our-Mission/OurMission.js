"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import "venobox/dist/venobox.min.css";

import videoImg from "../../public/images/others/video-04.jpg";

const OurMissionArea = () => {
  useEffect(() => {
    import("venobox/dist/venobox.min.js").then((venobox) => {
      new venobox.default({
        selector: ".popup-video",
      });
    });
  }, []);
  return (
    <>
      <div className="row g-5">
        <div className="col-lg-6">
          <div className="video-popup-wrapper">
            <Image
              className="w-100 rbt-radius"
              src={videoImg}
              alt="Video Images"
            />
            <Link
              className="rbt-btn btn-white rounded-player popup-video position-to-top"
              href="https://www.youtube.com/watch?v=nA1Aqp0sPQo"
              data-vbtype="video"
              controls
            >
              <span>
                <i className="feather-play"></i>
              </span>
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="addmission-guide-content pl--50 pl_sm--0 pl_md--0 pl_lg--0">
            <h3 className="title">Our Mission</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation
            </p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation
            </p>
            <h5>Subtitle</h5>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <div className="apply-btn">
              <a
                className="rbt-btn btn-gradient radius-round icon-hover"
                href="/our-courses"
              >
                <span className="btn-text">Get Started</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurMissionArea;

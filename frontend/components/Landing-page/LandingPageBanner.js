import React, { useEffect } from "react";
import Link from "next/link";
import Typed from "typed.js";

const LandingPageBanner = () => {
  useEffect(() => {
    const typeitInstance = new Typed(".is-visible", {
      strings: ["Fitness.", "Lifestyle"],
      typeSpeed: 80,
      backSpeed: 60,
      startDelay: 200,
      loop: Infinity,
      showCursor: false,
    });

    return () => {
      typeitInstance.destroy();
    };
  }, []);

  return (
    <>
      <div className="row g-5 align-items-center">
        <div className="col-lg-10 offset-lg-1">
          <div className="content">
            <div className="inner text-center">
              <div className="rbt-new-badge rbt-new-badge-one">
                <span className="rbt-new-badge-icon">🏆</span> Welcome to Leaton 
                Online Fitness
              </div>

              <h1 className="title">
                Get started with your 
                <span className="header-caption ms-2">
                  <span className="cd-headline clip is-full-width">
                    <span className="cd-words-wrapper">
                      <b className="is-visible theme-gradient"></b>
                    </span>
                  </span>
                </span>
              </h1>
              <p className="description has-medium-font-size mt--20">
              Please or register below to see the available courses. GET STARTED TODAY!!.
              </p>
              <div className="slider-btn rbt-button-group justify-content-center">
                <Link
                  className="rbt-btn btn-gradient hover-icon-reverse"
                  href="/login"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Log in to Start</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </span>
                </Link>
                <Link className="rbt-btn hover-icon-reverse btn-white" href="/contact-us">
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Contact US</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPageBanner;

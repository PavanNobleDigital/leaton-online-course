"use client";

import { useEffect } from "react";
import Link from "next/link";
import sal from "sal.js";
import HomeCourse from "../01-Main-Demo/Home-Sections/HomeCourse";
import NewsletterThree from "../Newsletters/Newsletter-Three";
import Card from "../Cards/Card";
import BlogGrid from "../Blogs/BlogGrid";
import Instagram from "../Instagram/Instagram";
import TestimonialFour from "../Testimonials/Testimonial-Four";
import CategorySix from "../Category/CategorySix";

const LandingPageLms = ({ blogdata }) => {
  useEffect(() => {
    sal({
      threshold: 0.01,
      once: true,
    });
  }, []);
  return (
    <>
      <div className="rbt-banner-area rbt-banner-1 variation-2 height-750">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-8">
              <div className="content">
                <div className="inner">
                  <div className="rbt-new-badge rbt-new-badge-one">
                    <span className="rbt-new-badge-icon">🏆</span> Ready to get started with Leaton?
                  </div>
                  <h1 className="title">
                    Welcome to {" "}
                    <span className="color-primary">Leaton Online course</span> APP.
                  </h1>
                  <p className="description">
                    Please or register below to see the available courses. {" "}
                    <strong>GET STARTED TODAY!!</strong>.
                  </p>
                  <div className="slider-btn">
                    <Link
                      className="rbt-btn btn-gradient hover-icon-reverse"
                      href="login"
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Get Started</span>
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
            <div className="col-lg-4">
              <div className="content">
                <div className="banner-card pb--60 swiper rbt-dot-bottom-center banner-swiper-active">
                  <HomeCourse start={3} end={6} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default LandingPageLms;

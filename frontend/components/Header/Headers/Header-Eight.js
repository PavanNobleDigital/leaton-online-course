"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// import HeaderRightTwo from "../Header-Right/HeaderRight-Two";
import HeaderRight from "../Header-Right/HeaderRight";
import Search from "../Offcanvas/Search";
import Nav from "../Nav";
// import Nav from "../Nav-backup";

import logo from "../../../public/images/logo/logo.png";

const HeaderEight = ({
  headerType,
  gapSpaceBetween,
  sticky,
  headerSticky,
  navigationEnd,
  container,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`rbt-header-wrapper ${gapSpaceBetween} ${sticky}  ${
          !headerType && isSticky ? `${headerSticky}` : ""
        }`}
      >
        <div className={`${container}`}>
          <div className={`mainbar-row ${navigationEnd} align-items-center`}>
            <div className="header-left rbt-header-content">
              <div className="header-info">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src={logo}
                      width={152}
                      height={50}
                      priority={true}
                      alt="Leaton Logo Images"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rbt-main-navigation d-none d-xl-block">
              <Nav />
            </div>

            <HeaderRight
              userType="Admin"
              btnText="Enroll Now"
              btnClass="rbt-marquee-btn marquee-auto btn-border-gradient radius-round btn-sm hover-transform-none"
            />
          </div>
        </div>
        <Search />
      </div>
    </>
  );
};

export default HeaderEight;

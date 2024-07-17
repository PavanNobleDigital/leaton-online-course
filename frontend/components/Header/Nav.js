"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';




const Nav = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const toggleMenuItem = (item) => {
    setActiveMenuItem(activeMenuItem === item ? null : item);
  };
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const fetchmenuData = async () => {
      try {
        const response = await fetch("/api/primary_menu/"); // Replace with your API endpoint
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchmenuData();
  }, [setMenuData]);

  if (!menuData) {
    return "loading...";
  }

  return (
    <nav className="mainmenu-nav">
      <ul className="mainmenu">
        <li className="with-megamenu has-nav.jsmenu-child-item position-static">
          <Link
            className={`${activeMenuItem === "home" ? "open" : ""}`}
            onClick={() => toggleMenuItem("home")}
            href="/"
          >
            Home
          </Link>
        </li>
        <li className="has-dropdown has-menu-child-item">
          <Link
            className={`${activeMenuItem === "aboutus" ? "open" : ""}`}
            href="#"
            onClick={() => toggleMenuItem("aboutus")}
          >
            About Us
            <i className="feather-chevron-down"></i>
          </Link>
          <ul
            className={`submenu ${activeMenuItem === "aboutus" ? "active d-block" : ""
              }`}
          >
            {menuData &&
              menuData.menuData.map((data, index) => {
                if (data.menuType === "default-dropdown") {
                  const elements = data.menuItems?.map((value, innerIndex) => (
                    <li className="has-dropdown" key={innerIndex}>
                      <Link href={value.link}>{value.title}</Link>
                    </li>
                  ));
                  return elements;
                }
                return null;
              })}
          </ul>
        </li>
        {/* Our Course */}
        <li className="with-megamenu has-nav.jsmenu-child-item position-static">
          <Link
            className={`${activeMenuItem === "our-course" ? "open" : ""}`}
            onClick={() => toggleMenuItem("our-course")}
            href="/course-list"
          >
            Our Courses
          </Link>
        </li>


        {/* FAQ’s */}
        <li className="with-megamenu has-nav.jsmenu-child-item position-static">
          <Link
            className={`${activeMenuItem === "faqs" ? "open" : ""}`}
            onClick={() => toggleMenuItem("faqs")}
            href="/faqs"
          >
            FAQ
          </Link>
        </li>

        {/* Contact Us */}
        <li className="with-megamenu has-nav.jsmenu-child-item position-static">
          <Link
            className={`${activeMenuItem === "contact-us" ? "open" : ""}`}
            onClick={() => toggleMenuItem("contact-us")}
            href="/contact-us"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;

"use client";

import Link from "next/link";
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import User from "../Offcanvas/User";
import { useAppContext } from "@/context/Context";

const HeaderRight = ({ btnClass, btnText, userType }) => {
  const { mobile, setMobile, search, setSearch, cartToggle, setCart } =
    useAppContext();

  const { total_items } = useSelector((state) => state.CartReducer);
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (user.disclaimer === false) {
        router.push('/health-disclaimer');
      }
    } else {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated) {
    return "";
  }

  return (
    <div className="header-right right-header">
      <ul className="quick-access">
        <li className="access-icon rbt-mini-cart">
          <Link
            className="rbt-cart-sidenav-activation rbt-round-btn"
            href="#"
            onClick={() => setCart(!cartToggle)}
          >
            <i className="feather-shopping-cart"></i>
            <span className="rbt-cart-count">{total_items}</span>
          </Link>
        </li>

        <li className="account-access rbt-user-wrapper d-none d-xl-block">
          <Link href="#">
            <i className="feather-user"></i>
            {user && user.full_name ? user.full_name : user.name}
          </Link>
          <User />
        </li>

        <li className="access-icon rbt-user-wrapper d-block d-xl-none">
          <Link className="rbt-round-btn" href="#">
            <i className="feather-user"></i>
          </Link>
          <User />
        </li>
      </ul>

      <div className="rbt-btn-wrapper d-none d-xl-block">
        <Link className={`rbt-btn ${btnClass}`} href="#">
          <span data-text={`${btnText}`}>{btnText}</span>
        </Link>
      </div>

      <div className="mobile-menu-bar d-block d-xl-none">
        <div className="hamberger">
          <button
            className="hamberger-button rbt-round-btn"
            onClick={() => setMobile(!mobile)}
          >
            <i className="feather-menu"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderRight;

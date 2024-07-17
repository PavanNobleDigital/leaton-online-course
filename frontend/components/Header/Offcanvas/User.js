import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "@/redux/action/AuthAction";

const User = () => {
  const user = [useSelector(state => state.auth.user)];
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout(token));
  };
  return (
    <>
      <div className="rbt-user-menu-list-wrapper">
        {user &&
          user.map((person, index) => (
            <div className="inner" key={index}>
              <div className="rbt-admin-profile">
                <div className="admin-thumbnail">
                  <Image
                    src={person.img}
                    width={43}
                    height={43}
                    alt="User Images"
                  />
                </div>
                <div className="admin-info">
                  <span className="name">{person.name}</span>
                  <Link
                    className="rbt-btn-link color-primary"
                    href="/user-profile"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
              <hr className="mt--10 mb--10" />
              <ul className="user-list-wrapper">
                <li>
                  <Link href="/my-dashboard">
                    <i className="feather-home"></i>
                    <span>My Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link href="/user-enrolled-course">
                    <i className="feather-shopping-bag"></i>
                    <span>Enrolled Courses</span>
                  </Link>
                </li>
                <li>
                  <Link href="/user-order-history">
                    <i className="feather-book-open"></i>
                    <span>Order History</span>
                  </Link>
                </li>
              </ul>
              <hr className="mt--10 mb--10" />
              <ul className="user-list-wrapper">
                <li>
                  <Link href="/user-settings">
                    <i className="feather-settings"></i>
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <a href="#" onClick={handleLogout}>
                    <i className="feather-log-out"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          ))}
      </div>
    </>
  );
};

export default User;

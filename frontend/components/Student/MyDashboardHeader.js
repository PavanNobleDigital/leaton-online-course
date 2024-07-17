import Image from "next/image";
import Link from "next/link";





const MyDashboardHeader = ({user}) => {
  return (
    <>
      <div className="rbt-dashboard-content-wrapper">
        <div className="tutor-bg-photo bg_image bg_image--23 height-350" />
        <div className="rbt-tutor-information">
          <div className="rbt-tutor-information-left">
            <div className="thumbnail rbt-avatars size-lg">
              {/* <Image
                width={300}
                height={300}
                src={user.img}
                alt={user.firstname}
              /> */}
            </div>
            <div className="tutor-content">
              <h5 className="title">{user.lastname ? `${user.firstname} ${user.lastname}` : user.firstname}</h5>
              <ul className="rbt-meta rbt-meta-white mt--5">
                <li>
                  <i className="feather-book"></i>{user.no_of_course_enrolled} Courses Enrolled
                </li>
                {user.no_of_certificate >= 0 ?
                <li>
                  <i className="feather-award"></i>{user.no_of_certificate} Certificate
                </li>: ""}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDashboardHeader;

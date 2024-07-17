import Image from "next/image";
import { usePathname, useParams } from "next/navigation";

// import CoursePageBreadcrumb from "./Course-Breadcrumb";
// import CoursePageBreadcrumb from "./Course-Breadcrumb";
import CoursePageBreadcrumb from "@/components/app/course/detailspage/Course-Breadcrumb";
import CourseBreadcrumb from "@/components/Course-Details/Course-Sections/Course-Breadcrumb";

import bgImage from "../../../../public/images/bg/bg-image-10.jpg";

const CoursePageHead = ({ checkMatch }) => {
  const pathname = usePathname();
  const path = useParams();

  return (

        <>
          <div className="breadcrumb-inner">
            <Image src={bgImage} alt="Education Images" />
          </div>
          <div className="container">
            <div className="row">
              <CoursePageBreadcrumb getMatchCourse={checkMatch && checkMatch} />
            </div>
          </div>
        </>
  );
};

export default CoursePageHead;

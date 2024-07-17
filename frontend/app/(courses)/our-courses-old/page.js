import BackToTop from "@/app/backToTop";
import CourseWithSidebarLayout from "./index"
import OurCoursesWithSidebarLayout from "./index";

export const metadata = {
  title: "Course With Sidebar - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const OurCoursesWithSidebarPage = () => {
  return (
    <>
      <OurCoursesWithSidebarLayout />

      <BackToTop />
    </>
  );
};

export default OurCoursesWithSidebarPage;

import OurCoursesTabPage from "./index";
import OurCoursesTabPageProvider from "./index";

export const metadata = {
  title: "Course With Tab One - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const OurCoursesTabLayout = () => {
  return (
    <>
      <OurCoursesTabPageProvider />
    </>
  );
};

export default OurCoursesTabLayout;

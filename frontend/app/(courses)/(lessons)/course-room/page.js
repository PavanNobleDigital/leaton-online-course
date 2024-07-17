import BackToTop from "@/app/backToTop";
import CourseRoom from "./(course-room)";

export const metadata = {
  title: "Lesson - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const LessonLayout = () => {
  return (
    <>
      <CourseRoom />
      <BackToTop />
    </>
  );
};

export default LessonLayout;

import BackToTop from "@/app/backToTop";
// import StudentDashboard from "./(my-account)";
import MyAccountDashboard from "./(my-dashboard)";

export const metadata = {
  title: "Student Dashboard - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const MyDashboardLayout = () => {
  return (
    <>
      <MyAccountDashboard />
      <BackToTop />
    </>
  );
};

export default MyDashboardLayout;

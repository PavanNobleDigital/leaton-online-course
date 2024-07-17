import BackToTop from "@/app/backToTop";
// import UserProfile from "./(profile)";
import UserProfileDashboard from "./(profile)";

export const metadata = {
  title: "My Profile - Leaton App",
  description: "My Profile - Leaton App",
};

const UserProfileLayout = () => {
  return (
    <>
      <UserProfileDashboard />
      <BackToTop />
    </>
  );
};

export default UserProfileLayout;

import BackToTop from "@/app/backToTop";
import UserSettingDashboard from "./(settings)";

export const metadata = {
  title: "User Details Settings - Leaton App",
  description: "User Details Settings - Leaton App",
};

const UserSettingLayout = () => {
  return (
    <>
      <UserSettingDashboard />

      <BackToTop />
    </>
  );
};

export default UserSettingLayout;

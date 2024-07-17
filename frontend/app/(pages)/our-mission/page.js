import BackToTop from "@/app/backToTop";
import OurMissionPage from "./(our-mission)";

export const metadata = {
  title: "Our Mission - Leaton App",
  description: "Our Mission - Leaton App",
};

const OurMissionLayout = () => {
  return (
    <>
      <OurMissionPage />

      <BackToTop />
    </>
  );
};

export default OurMissionLayout;

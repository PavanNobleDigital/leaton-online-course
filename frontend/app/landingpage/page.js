import BackToTop from "@/app/backToTop";
import LandingpageDesign from "./landingpage/index";

export const metadata = {
  title: "Welcome to Leaton App",
  description: "Welcome to Leaton App",
};
const AboutUsLayout = () => {
  return (
    <>
      <LandingpageDesign />
      <BackToTop />
    </>
  );
};

export default AboutUsLayout;

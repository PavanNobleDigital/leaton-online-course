// import BackToTop from "./backToTop";
// import HomePage from "./05-classic-lms/page";
// import ClassicLmsLayout from "./05-classic-lms/page";
import HomePageLayout from "./Homepage/page";
export const metadata = {
  title: "Home - Leaton App",
  description: "Leaton App",
};

export default function Home() {
  return (
    <main>
      <HomePageLayout />
      {/* <LandingPageLayout /> */}
    </main>
  );
}

import BackToTop from "../backToTop";
import LandingPage from "./landing-page";
import { getAllPostsMeta } from "@/mdx";

export const metadata = {
  title: "Landing page",
  description: "Online Courses & Education NEXTJS14 Template",
};

const LandingPageLayout = async () => {
  const blog = await getAllPostsMeta();
  return (
    <>
      <LandingPage getAllBlogs={blog} />
      <BackToTop />
    </>
  );
};

export default LandingPageLayout;

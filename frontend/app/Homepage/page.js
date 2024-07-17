// import BackToTop from "../backToTop";
// import ClassicLmsPage from "./(homepage)";
import HomeLmsPage from "./(homepage)";
import { getAllPostsMeta } from "@/mdx";

export const metadata = {
  title: "Leaton App - Home",
  description: "Home",
};

const HomePageLayout = async () => {
  const blog = await getAllPostsMeta();
  return (
    <>
      <HomeLmsPage getAllBlogs={blog} />
    </>
  );
};

export default HomePageLayout;

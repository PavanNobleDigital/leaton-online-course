import BackToTop from "@/app/backToTop";
// import UserOrderHistory from "./(order-history)";
import UserOrderHistoryTab from "./(order-history)";

export const metadata = {
  title:
    "Student Order History Attempts Course - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const UserOrderHistoryLayout = () => {
  return (
    <>
      <UserOrderHistoryTab />

      <BackToTop />
    </>
  );
};

export default UserOrderHistoryLayout;

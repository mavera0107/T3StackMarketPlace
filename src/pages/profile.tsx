import dynamic from "next/dynamic";

const userPage = dynamic(() => import("../components/profile/userProfile"), {
  ssr: false,
});

// Define the correct typing for userPage
const UserPage = userPage;

export default function UserLogin() {
  return <UserPage />;
}

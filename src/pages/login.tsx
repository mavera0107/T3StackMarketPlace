import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("../components/Login/login"), {
  ssr: false,
});

export default function UserLogin() {
  return <LoginPage />;
}

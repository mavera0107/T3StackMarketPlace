import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("../components/login/Login"), {
  ssr: false,
});

export default function UserLogin() {
  return <LoginPage />;
}

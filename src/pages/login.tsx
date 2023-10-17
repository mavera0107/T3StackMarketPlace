import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = dynamic(() => import("../components/Login/login"), {
  ssr: false,
});

export default function UserLogin() {
  // const router = useRouter();
  // useEffect(() => {
  //   let checkUser: any = localStorage.getItem("user") as any;
  //   if (checkUser !== "true") {
  //     router.push("/login");
  //   } else if (checkUser === "true") {
  //     router.push("/test");
  //   } else {
  //     console.log("/login", localStorage.getItem("user"));
  //   }
  // }, []);
  return <LoginPage />;
}

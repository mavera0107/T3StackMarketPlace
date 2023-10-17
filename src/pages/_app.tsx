import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
// import dynamic from "next/dynamic";
// const Layout = dynamic(() => import("../components/Layout/index"), {
//   ssr: false,
// });
const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);

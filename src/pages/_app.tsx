import { type AppType } from "next/app";
import "@biconomy/web3-auth/dist/src/style.css";
import { trpc } from "~/utils/trpc";

import "~/styles/globals.css";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/Layout/index"), {
  ssr: false,
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default trpc.withTRPC(MyApp);

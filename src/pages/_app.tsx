import { type AppType } from "next/app";
import "@biconomy/web3-auth/dist/src/style.css";
import { trpc } from "~/utils/trpc";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);

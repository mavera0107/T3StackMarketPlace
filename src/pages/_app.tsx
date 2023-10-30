import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../components/layout/index"), {
  ssr: false,
});
import { ReduxProviders } from "~/redux/provider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ReduxProviders>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProviders>
  );
};

export default api.withTRPC(MyApp);

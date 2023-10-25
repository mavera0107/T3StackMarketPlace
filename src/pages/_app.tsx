import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";

const Layout = dynamic(() => import("../components/Layout/index"), {
  ssr: false,
});
import { ReduxProviders } from "~/redux/provider";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <ReduxProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReduxProviders>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);

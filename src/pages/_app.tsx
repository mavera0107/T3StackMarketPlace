import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import dynamic from "next/dynamic";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "viem/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const Layout = dynamic(() => import("../components/layout/index"), {
  ssr: false,
});
import { ReduxProviders } from "~/redux/provider";

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({
      apiKey: String(process.env.NEXT_PUBLIC_Mumbai_RPC_URL || ""),
    }),
    publicProvider(),
  ],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={config}>
      <ReduxProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReduxProviders>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);

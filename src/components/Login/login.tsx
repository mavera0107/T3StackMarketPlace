import { useEffect, useRef, useState, Fragment } from "react";
import SocialLogin from "@biconomy/web3-auth";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import { paymaster, bundler, Debug } from "../contants";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
} from "@biconomy/account";
import { DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { useRouter } from "next/router";
import Trpc from "~/pages/api/trpc/[trpc]";
import { api } from "~/utils/api";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Button } from "../ui/ui/button";
import { Loader2 } from "lucide-react";

export default function RegisterationPage() {
  const router = useRouter();
  const [interval, enableInterval] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setProvider] = useState<ethers.providers.Web3Provider>();
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccount>();
  const clientId: any = process.env.NEXT_PUBLIC_CLIENT_ID; // get from https://dashboard.web3auth.io
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  const loginUser = api.user.create.useMutation({
    onSuccess(res: any) {
      console.log(res, "Login result");
    },
    onError: (err: any) => {
      console.log(err.message, "login err");
      setIsLoading(false);
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          uiConfig: {
            mode: "light",
            appName: "NFTrops",
            logoLight: "mainlogo.png", // <-- Your dApp Name
            theme: {
              primary: "#ffffff",
            }, // "light" | "dark" | "auto"
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            loginGridCol: 2, // 2 | 3
            // primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
          },
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget:
              "https://polygon-mumbai.g.alchemy.com/v2/Mh7MEm0SLywtlNh1_bcuroflDlQ3wYpu", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "testnet",
        });

        setWeb3auth(web3auth);

        await web3auth.initModal({
          modalConfig: {
            openlogin: {
              label: "openlogin",
              loginMethods: {
                facebook: {
                  name: "facebook",
                  showOnModal: false,
                },
                reddit: {
                  name: "reddit",
                  showOnModal: false,
                },
                twitch: {
                  name: "twitch",
                  showOnModal: false,
                },
                apple: {
                  name: "apple",
                  showOnModal: false,
                },
                line: {
                  name: "line",
                  showOnModal: false,
                },
                github: {
                  name: "github",
                  showOnModal: false,
                },
                kakao: {
                  name: "kakao",
                  showOnModal: false,
                },
                linkedin: {
                  name: "linkedin",
                  showOnModal: false,
                },
                twitter: {
                  name: "twitter",
                  showOnModal: false,
                },
                weibo: {
                  name: "weibo",
                  showOnModal: false,
                },
                discord: {
                  name: "discord",
                  showOnModal: false,
                },
                wechat: {
                  name: "wechat",
                  showOnModal: false,
                },
                email_passwordless: {
                  name: "email_passwordless",
                  showOnModal: false,
                },
                sms_passwordless: {
                  name: "sms_passwordless",
                  showOnModal: false,
                },
              },
            },
            [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
              label: "wallet_connect",
              showOnModal: false,
            },
            [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
              label: "wallet_connect",
              showOnModal: false,
            },
            // Disable Metamask
            [WALLET_ADAPTERS.METAMASK]: {
              label: "metamask",
              showOnModal: false,
            },
            [WALLET_ADAPTERS.TORUS_EVM]: {
              label: "TORUS_EVM",
              showOnModal: false,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const loginHandle = async () => {
    if (!web3auth) {
      return;
    }
    setIsLoading(true);
    const web3authProvider: any = await web3auth.connect();

    // SmartAccount
    setupSmartAccount(web3authProvider);
  };

  async function setupSmartAccount(web3authProvider: any) {
    try {
      // Initialize the smart account
      let web3Provider: any = new ethers.providers.Web3Provider(
        web3authProvider,
      );
      Debug && console.log("WEb3 Providers .. ", web3Provider.getSigner());
      const config: BiconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster,
      };
      const smartAccount = new BiconomySmartAccount(config);
      await smartAccount.init();
      Debug && console.log("Smart Account : ", smartAccount);
      // Save the smart account to a state variable
      let address = await smartAccount.getSmartAccountAddress();

      let value: any = {
        wallet_address: address,
      };
      console.log("Web3 Auth provider", web3authProvider);
      console.log("Account", smartAccount);
      router.push("/test");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Fragment>
      {!isLoading ? (
        <div className="flex min-h-screen items-center justify-center">
          {" "}
          <Button
            onClick={loginHandle}
            variant={"outline"}
            className="rounded px-8 py-6 text-2xl text-green-500 hover:bg-green-300"
          >
            Login
          </Button>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <Button
            disabled
            variant={"outline"}
            className="rounded px-8 py-6 text-2xl text-green-500 hover:bg-green-300"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            LogingIn
          </Button>
        </div>
      )}
    </Fragment>
  );
}

import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import SocialLogin from "@biconomy/web3-auth";
import { ethers } from "ethers";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
} from "@biconomy/account";
import { Web3Auth } from "@web3auth/modal";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "~/redux/store";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { setSmartAccount } from "~/redux/Features/smartAccountslice";
import { ChainId } from "@biconomy/core-types";
import { bundler, paymaster } from "../../utils/contants";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [interval, enableInterval] = useState<boolean>(false);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const clientId: any = process.env.NEXT_PUBLIC_CLIENT_ID;

  const { smartAccount } = useSelector(
    (state: RootState) => state.smartAccountSlice as any,
  );

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
        if (web3auth.connected) {
          enableInterval(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  async function loginHandle() {
    // If the SDK has not been initialized yet, initialize it
    if (!web3auth) {
      console.log("no Web3 auth");
    }
    const web3authProvider: any = await web3auth?.connect();
    // SmartAccount
    setupSmartAccount(web3authProvider);
  }

  async function setupSmartAccount(web3authProvider: any) {
    try {
      // Initialize the smart account
      let web3Provider: any = new ethers.providers.Web3Provider(
        web3authProvider,
      );
      // setProvider(web3Provider);
      const config: BiconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster,
      };
      const smartAccount = new BiconomySmartAccount(config);
      await smartAccount.init();
      console.log("Smart Account in layout : ", smartAccount);
      console.log("Address :: ", await smartAccount.getSmartAccountAddress());
      dispatch(setSmartAccount(smartAccount));
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    let ifUser: any = JSON.parse(localStorage.getItem("user") as any);
    setUser(ifUser);
    if (interval) {
      if (!ifUser) {
      } else {
        console.log("smartAccount : ", smartAccount);
        if (!smartAccount) {
          loginHandle();
          console.log("hello Undefeined..");
        }
      }
    }
  }, [children, interval]);

  return (
    <Fragment>
      {user?.id ? <Header account={user} /> : <></>}
      <Fragment>
        <main className="mb-32">{children}</main>
      </Fragment>
      {user?.id ? <Footer /> : <></>}
    </Fragment>
  );
};
export default Layout;

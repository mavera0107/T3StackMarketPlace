import { useEffect, useState, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import { paymaster, bundler, Debug } from "../../utils/contants";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
} from "@biconomy/account";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Button } from "../ui/ui/button";
import { Loader2 } from "lucide-react";
import { setSmartAccount } from "~/redux/Features/smartAccountslice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "~/redux/store";
export default function RegisterationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const clientId: any = process.env.NEXT_PUBLIC_CLIENT_ID; // get from https://dashboard.web3auth.io
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  const loginUser = api.user.create.useMutation({
    onSuccess(res: any) {
      console.log(res, "Login result");
    },
    onError: (err: any) => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false);
      console.log(err.message, "login err");
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
      console.log("Smart Account : ", smartAccount);
      // Save the smart account to a state variable
      let address = await smartAccount.getSmartAccountAddress();
      const user = await web3auth?.getUserInfo();
      console.log("User", user);
      console.log(user?.email, user?.name);
      let value: any = {
        wallet_address: address,
        email_address: user?.email,
        full_name: user?.name,
      };

      let response = await loginUser.mutateAsync(value);
      console.log("Response", response);

      if (response.id) {
        toast.success("Signin Successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      // console.log("Web3 Auth provider", web3authProvider);
      console.log("Account", smartAccount);
      localStorage.setItem("user", JSON.stringify(response));
      dispatch(setSmartAccount(smartAccount));
      setTimeout(() => {
        router.push("/test"); // Replace '/test' with your desired route
      }, 2000);
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
            <img src="google-signIn.png" className="h-10 w-10 p-1" />
            Login with Google
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
            LogingIn Please Wait
          </Button>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Fragment>
  );
}

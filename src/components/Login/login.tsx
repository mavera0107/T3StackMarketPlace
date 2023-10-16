import { useEffect, useRef, useState, Fragment } from "react";
import SocialLogin from "@biconomy/web3-auth";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import { paymaster, bundler } from "../contants";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
} from "@biconomy/account";
import { DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { useRouter } from "next/router";

export default function RegisterationPage() {
  const router = useRouter();
  const sdkRef = useRef<SocialLogin | null>(null);
  const [interval, enableInterval] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [, setProvider] = useState<ethers.providers.Web3Provider>();
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccount>();

  async function login() {
    console.log("Interval", interval);
    console.log("sdk", sdkRef);
    if (!sdkRef.current) {
      const socialLoginSDK = new SocialLogin();
      const signature1 = await socialLoginSDK.whitelistUrl(
        "https://biconomy-social-login-market-git-main-muhammadwaqarqsol.vercel.app",
      );
      const signature2 = await socialLoginSDK.whitelistUrl(
        "http://localhost:3000/",
      );
      await socialLoginSDK.init({
        chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI).toString(),
        network: "testnet",
        whitelistUrls: {
          "https://biconomy-social-login-market-git-main-muhammadwaqarqsol.vercel.app":
            signature1,
          "http://localhost:3000/": signature2,
        },
      });
      sdkRef.current = socialLoginSDK;
    }
    if (!sdkRef.current?.provider) {
      sdkRef.current?.showWallet();
      enableInterval(true);
    } else {
      console.log("hello");
      setupSmartAccount();
    }
  }

  async function setupSmartAccount() {
    try {
      // If the SDK hasn't fully initialized, return early
      if (!sdkRef.current?.provider) return;

      // Hide the wallet if currently open
      sdkRef.current.hideWallet();

      // Start the loading indicator
      setLoading(true);

      // Initialize the smart account
      let web3Provider = new ethers.providers.Web3Provider(
        sdkRef.current?.provider,
      );
      setProvider(web3Provider);
      const config: BiconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        rpcUrl: process.env.NEXT_PUBLIC_RPC,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster,
      };
      const smartAccount = new BiconomySmartAccount(config);
      await smartAccount.init();

      // Save the smart account to a state variable
      setSmartAccount(smartAccount);
      localStorage.setItem("User", "true");
      router.push("/test");
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }
  useEffect(() => {
    let configureLogin: NodeJS.Timeout | undefined;
    if (interval) {
      configureLogin = setInterval(() => {
        if (!!sdkRef.current?.provider) {
          setupSmartAccount();
          clearInterval(configureLogin);
        }
      }, 1000);
    }
  }, [interval]);

  return (
    <Fragment>
      {!smartAccount && !loading ? (
        <div className="flex min-h-screen items-center justify-center">
          {" "}
          <button
            onClick={login}
            className=" position m-12 rounded-lg bg-slate-400"
          >
            Login
          </button>
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
}

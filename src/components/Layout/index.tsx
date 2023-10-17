import { ReactNode, useRef, useState } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import SocialLogin from "@biconomy/web3-auth";
import { ethers } from "ethers";
import { BiconomySmartAccount } from "@biconomy/account";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const sdkRef = useRef<SocialLogin | null>(null);
  const [interval, enableInterval] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [, setProvider] = useState<ethers.providers.Web3Provider>();
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccount>();

  return <Header />;
};
export default Layout;

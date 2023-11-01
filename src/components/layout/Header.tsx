import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/ui/dropdown-menu";
import { useRouter } from "next/router";
import { Button } from "../ui/ui/button";
import { setSmartAccount } from "~/redux/Features/smartAccountslice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";
import { ERC20_ABI, USDC_Contract_Address } from "~/utils/contants";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/redux/store";
import { fetchData } from "~/utils/helper-function";
import { setFetchedBalance } from "~/redux/Features/balanceSlice";
import { setAddress } from "~/redux/Features/smartaccountaddressSlice";

export default function Header(props: any) {
  const { smartAccount } = useSelector(
    (state: RootState) => state.smartAccountSlice as any,
  );
  const { balance } = useSelector(
    (state: RootState) => state.AccountBalanceSlice as any,
  );

  const dispatch = useDispatch();
  const router = useRouter();

  function profile() {
    router.push("/profile");
  }

  function copyAddress() {
    navigator.clipboard
      .writeText(props.account.wallet_address)
      .then(function () {
        alert("Address copied to clipboard: " + props.account.wallet_address);
      })
      .catch(function (err) {
        console.error("Unable to copy address: ", err);
      });
  }
  async function logout() {
    try {
      dispatch(setSmartAccount(undefined));
      dispatch(setFetchedBalance("0"));
      dispatch(setAddress(""));
      localStorage.clear();
      toast("Logout Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.replace("/login");
    } catch (error) {
      console.log(error, "error");
    }
  }
  function TransfertoEOA() {
    router.push("/transfertoEoa");
  }
  function RecentTransaction() {
    router.push("/recenttransaction");
  }

  useEffect(() => {
    const fetchDataAndSetBalance = async () => {
      dispatch(setAddress(props.account.wallet_address));
      try {
        const balance = await fetchData(props.account.wallet_address);
        if (balance) {
          dispatch(setFetchedBalance(balance));
        }
      } catch (error) {
        // Handle errors here
        console.log(error);
      }
    };
    fetchDataAndSetBalance();
    console.log(balance);
  }, []);

  return (
    <header className="body-font text-gray-600">
      <div className="flex flex-row items-center justify-center align-middle">
        <div className="items-cente container mx-auto flex flex-col flex-wrap p-5 md:flex-row">
          <a className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0">
            <Link href="/">
              <img src="./logo.png" className="w-30 h-12"></img>
            </Link>
          </a>
          <nav className="md:mr-auhref flex flex-wrap items-center justify-center text-base	md:ml-4 md:border-l md:border-gray-400 md:py-1 md:pl-4">
            <a className="mr-5 hover:text-gray-900">
              <Link href="/mintNFT">Mint NFT</Link>
            </a>
            <a className="mr-5 hover:text-gray-900">
              <Link href="/mynfts">My NFTS</Link>
            </a>
            <a className="mr-5 hover:text-gray-900">
              <Link href="/listednfts">Listed Nfts</Link>
            </a>
          </nav>
        </div>
        <div className="m-3 flex flex-row items-center justify-center rounded-xl bg-purple-400">
          <div className="rounded-xl p-2">Balance</div>
          <div>:{balance}$</div>
        </div>
        <div className="flex items-center justify-center bg-white">
          <div className="rounded-xl bg-purple-400 p-2" onClick={copyAddress}>
            {props.account.wallet_address.slice(0, 7)}....
            {props.account.wallet_address.slice(11, 16)}
          </div>
          <DropdownMenu>
            <div className="flex flex-row items-center justify-center">
              <div>
                {" "}
                <DropdownMenuTrigger className="m-2 text-xl font-bold">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
              </div>
            </div>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem className="font-bold" onClick={profile}>
                <Button>Profile</Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />
              <DropdownMenuItem className="font-bold" onClick={TransfertoEOA}>
                <Button>Transfer Tokens To EOA</Button>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="font-bold"
                onClick={RecentTransaction}
              >
                <Button>Recent Trasaction</Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold">
                <Button onClick={logout}>Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

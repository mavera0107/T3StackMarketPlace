import React from "react";
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
export default function Header() {
  const router = useRouter();

  function profile() {
    router.push("/profile");
  }
  function RecentTransaction() {
    router.push("/RecentTransaction");
  }
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
              <Link href="/ListedNfts">Listed Nfts</Link>
            </a>
          </nav>
        </div>
        <div className="flex items-center justify-center bg-white">
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
            <DropdownMenuContent>
              <DropdownMenuItem className="font-bold" onClick={profile}>
                <Button>Profile</Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />
              <DropdownMenuItem
                className="font-bold"
                onClick={RecentTransaction}
              >
                <Button>Recent Transactions</Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold">
                <Button>Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

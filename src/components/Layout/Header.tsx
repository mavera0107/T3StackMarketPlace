import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/ui/dropdown-menu";
import { useRouter } from "next/router";
export default function Header() {
  const router = useRouter();

  function profile() {
    router.push("/profile");
  }
  return (
    <header className="body-font text-gray-600">
      <div className="mx-auhref container flex flex-col flex-wrap items-center p-5 md:flex-row">
        <a className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0">
          <Link href="/">
            <img src="./logo.png" className="w-30 h-12"></img>
          </Link>
        </a>
        <nav className="md:mr-auhref flex flex-wrap items-center justify-center text-base	md:ml-4 md:border-l md:border-gray-400 md:py-1 md:pl-4">
          <a className="mr-5 hover:text-gray-900">
            <Link href="/mintNFT">Mint Nft</Link>
          </a>
          <a className="mr-5 hover:text-gray-900">
            <Link href="/MyNfts">My Nfts</Link>
          </a>
          <a className="mr-5 hover:text-gray-900">
            <Link href="/ListedNfts">Listed Nfts</Link>
          </a>
        </nav>
        <div>
          {" "}
          <DropdownMenu>
            <div className="flex flex-row justify-around ">
              <DropdownMenuTrigger className="m-2 text-xl font-bold">
                Open
              </DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <DropdownMenuContent>
              <DropdownMenuItem className="font-bold" onClick={profile}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />
              <DropdownMenuItem className="font-bold">
                Recent Transactions
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

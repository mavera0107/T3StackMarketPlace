import React from "react";
import Link from "next/link";
export default function Header() {
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
            <Link href="/MintNft">Mint Nft</Link>
          </a>
          <a className="mr-5 hover:text-gray-900">
            <Link href="/MyNfts">My Nfts</Link>
          </a>
          <a className="mr-5 hover:text-gray-900">
            <Link href="/ListedNfts">Listed Nfts</Link>
          </a>
          <a className="mr-5 hover:text-gray-900">
            <Link href="/RecentTransfers">Recent Transfers</Link>
          </a>
          <a className="mr-5 hover:text-gray-900">
            <Link href="/BoughtNFTs">Recent Bought</Link>
          </a>
          <a className="mr-5 hover:text-gray-900">
            <Link href="/SoldNFTs">Sold NFTs</Link>
          </a>
          <a className="mr-5 hover:text-gray-900">
            <Link href="/market">For Sale</Link>
          </a>
        </nav>
        <div className="flex flex-row items-center justify-center gap-6 rounded-lg ">
          <div>
            {/* {isConnected ? (
              <p className="items-center justify-center rounded-3xl bg-purple-300 p-2 text-xl">
                Owned : {Ownerof?.hrefString()}
              </p>
            ) : null} */}
            owner of address
          </div>
          ACCOUNT balance
          {/* <ConnectKitButhrefn showBalance /> */}
        </div>
      </div>
    </header>
  );
}

import React, { useState } from "react";
import { Button } from "../ui/ui/button";
import Card from "./nftcard";
import Link from "next/dist/client/link";
import { api } from "~/utils/api";

const MainTabs = () => {
  // extraVariable: boolean;
  const { data: UserNFTListing, error, refetch } = api.nft.all.useQuery();

  return (
    <div className="m-auto max-w-full p-6">
      <div dir="ltr" data-orientation="horizontal">
        <div className="mb-8 mt-2 flex items-center justify-center">
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="inline-flex h-10 items-center justify-center rounded-md bg-muted text-muted-foreground"
            tabIndex={0}
            data-orientation="horizontal"
          ></div>
        </div>
        {/* Tabs content */}
        <div
          role="tabpanel"
          tabIndex={-1}
          className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {
            <div>
              <div className="justify-center">
                <div className="flex-col text-center">
                  <h1 className="text-3xl">
                    "Experience Art In A New Dimension"
                  </h1>
                </div>
                <div className="flex-col text-center">
                  <div className="">
                    <h2 className="text-xl">
                      Find unique NFTs that capture the essence of creativity
                      and own a piece of art history
                    </h2>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-2xl">Top Picks for Today</h1>
                <div className="mt-7 grid grid-cols-5 gap-4">
                  {UserNFTListing?.map((nft) => (
                    <Card
                      key={nft.id}
                      nft={nft}
                      maintab={true}
                      func={() => {
                        console.log("empty");
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainTabs;

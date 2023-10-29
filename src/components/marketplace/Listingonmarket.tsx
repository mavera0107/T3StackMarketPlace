import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import Card from "../card/nftcard";
import { Skeleton } from "../ui/ui/skeleton";

// interface NFT {
//   id: string;
//   nft_creator: string | null;
//   nft_owner: string | null;
//   price: string | null;
//   ipfs_url: string | null;
//   name: string | null;
//   description: string | null;
//   token_id: string | null;
//   is_listed: boolean | null;
//   created_at: Date;
//   updated_at: Date;
//   owner_id: string;
// }

const NFTListing = () => {
  const {
    data: UserNFTListing,
    error,
    refetch,
    isLoading,
  } = api.nft.getNFTListing.useQuery();

  if (isLoading) {
    return (
      <div className="w-50 mb-32 mt-24 flex h-52 items-center justify-center">
        <div className="rounded-xl border border-gray-300 p-4 shadow-lg">
          <Skeleton className="mb-4 h-40 w-40 rounded-xl" />
          <Skeleton className="mb-2 h-6 w-48" />
          <Skeleton className="mb-4 h-4 w-32" />
          <Skeleton className="h-6 w-48" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-6 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {UserNFTListing?.map((nft, index) => (
          <Card key={index} nft={nft} maintab={false} mynftRefetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default NFTListing;

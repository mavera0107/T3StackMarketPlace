import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import Card from "../card/nftcard";

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
  } = api.nft.getUserNFTListing.useQuery({
    owner_id: "65365e66e6043ce7b5e3b5be",
  });

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {UserNFTListing?.map((nft, index) => (
          <Card key={index} nft={nft} maintab={false} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default NFTListing;

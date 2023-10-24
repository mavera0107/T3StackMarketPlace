import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import Card from "../card/nftcard";
interface NFT {
  id: string;
  nft_creator: string | null;
  nft_owner: string | null;
  price: string | null;
  ipfs_url: string | null;
  name: string | null;
  description: string | null;
  token_id: string | null;
  is_listed: boolean | null;
  created_at: Date;
  updated_at: Date;
  owner_id: string;
}
const NFTListing = () => {
  const [arrayOfArrays, setArrayOfArrays] = useState<NFT[]>([]);
  const UserNFTListing = api.nft.getUserNFTListing.useMutation({
    onSuccess: (res: any) => {
      console.log("Menu fetched successfully");
    },
    onError(error: any) {
      console.log("Error fetching menu");
    },
  });

  async function getUserNFTs() {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      let isUser: any = JSON.parse(localStorage.getItem("user") as any);
      // const data = await UserNFTListing.mutateAsync({});
      // console.log(isUser.id, "Listing");
      // const data = await UserNFTListing.mutateAsync({ isUser?.id });
      const data = await UserNFTListing.mutateAsync({
        // owner_id: isUser.id,
        owner_id: "65375c08a9ac4f73945d4b4d",
      });
      console.log(data);
      setArrayOfArrays(data);
    }
  }
  useEffect(() => {
    getUserNFTs();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {" "}
        {arrayOfArrays.map((nft, index) => (
          <Card key={index} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default NFTListing;

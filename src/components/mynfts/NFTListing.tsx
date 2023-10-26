import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import NFTCard from "../card/nftcard"; // Assuming the Card component is named NFTCard
import { Button } from "../ui/ui/button";

const MyNFTs = () => {
  const [user, setUser] = useState<any>({
    id: "", // Default value for email
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isUser = localStorage.getItem("user");
      if (isUser) {
        const userData = JSON.parse(isUser);
        setUser(userData);
      }
    }
  }, []);

  const {
    data: UserNFTListing,
    error,
    refetch,
  } = api.nft.getUserNFTs.useQuery({
    owner_id: user.id,
  });

  return (
    <div className="m-12 mb-10 flex flex-col items-start justify-start">
      <div className="m-4 grid grid-cols-6 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-4">
        {UserNFTListing?.map((nft, index) => (
          <NFTCard key={index} nft={nft} mynftRefetch={refetch} maintab={false}/>
        ))}
      </div>
    </div>
  );
};

export default MyNFTs;

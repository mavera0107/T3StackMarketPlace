import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import NFTCard from "../card/NFTcard"; // Assuming the Card component is named NFTCard
import { Button } from "../ui/ui/button";
import { Skeleton } from "../ui/ui/skeleton";

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
    isLoading,
  } = api.nft.getUserNFTs.useQuery({
    owner_id: user.id,
  });

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
    <div className="m-12 mb-10 flex flex-col items-start justify-start">
      <div className="m-4 grid grid-cols-6 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-4">
        {UserNFTListing?.map((nft, index) => (
          <NFTCard
            key={index}
            nft={nft}
            mynftRefetch={refetch}
            maintab={false}
          />
        ))}
      </div>
    </div>
  );
};

export default MyNFTs;

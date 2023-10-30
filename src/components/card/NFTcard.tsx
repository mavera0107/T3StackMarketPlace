import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/ui/button";
import { ListModal } from "../modals/ListModal";
import { RemoveListModal } from "../modals/RemoveList";
// Define the interface for the 'nft' prop
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

interface CardProps {
  nft: NFT;
  mynftRefetch: () => void;
  maintab: Boolean;
}

const Card: React.FC<CardProps> = ({ nft, mynftRefetch, maintab }) => {
  const [user, setUser] = useState<any>({
    wallet_address: "", // Default value for email
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isUser = localStorage.getItem("user");
      if (isUser) {
        const userData = JSON.parse(isUser);
        setUser(userData);
      }
    }
    console.log(nft.nft_owner === user.wallet_address);
  }, []);
  return (
    <div className="w-50 mb-32 mt-24 flex h-52 items-center justify-center">
      <div className="rounded-xl border border-gray-300 p-4 shadow-lg hover:shadow-2xl hover:shadow-green-300">
        <img
          src={nft.ipfs_url?.toString()}
          alt={nft.name?.toString()}
          className="mb-4 h-40 w-40 rounded-xl object-cover"
        />
        <h2 className="mb-2 text-xl font-bold">{nft.name}</h2>
        <p className="mb-4 text-gray-500">{nft.description?.slice(0, 13)}</p>
        <h1 className="font-bold">
          Price: {nft.price === "0" ? "Not Listed" : `${nft.price} $`}
        </h1>
        {maintab ? (
          <></>
        ) : (
          <div>
            {user.wallet_address && nft.nft_owner === user.wallet_address ? (
              nft.is_listed ? (
                <RemoveListModal
                  tokenId={String(nft.token_id)}
                  refetch={mynftRefetch}
                />
              ) : (
                <ListModal
                  tokenId={String(nft.token_id)}
                  refetch={mynftRefetch}
                />
              )
            ) : null}
          </div>
        )}
        <Link href={`/NFTDetails/${nft.id}`}>
          <Button className="m-2 rounded-xl bg-green-300">Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;

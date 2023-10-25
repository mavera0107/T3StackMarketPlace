import React, { useState } from "react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/ui/hover-card";
import { ListModal } from "../Modals/ListModal";
import { loadStripe } from "@stripe/stripe-js";

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
  maintab: Boolean;
  refetch: () => void;
}

const Card: React.FC<CardProps> = ({ nft, maintab, refetch }) => {
  const stripePromise: any = loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as any,
  );
  return (
    <div className="rounded-lg border border-gray-300 p-4 shadow-lg hover:shadow-2xl">
      <img
        src={nft.ipfs_url?.toString()}
        alt={nft.name?.toString()}
        className="mb-4 h-48 w-48 rounded-lg object-cover"
      />
      <h2 className="mb-2 text-xl font-bold">{nft.name}</h2>
      <p className="mb-4 text-gray-500">{nft.description}</p>

      {maintab && nft.is_listed && (
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => {
            // Handle buy logic here
          }}
        >
          Buy
        </button>
      )}

      {maintab && nft.is_listed &&<HoverCard>
        <div className="flex">
          <HoverCardTrigger>
            <p className="mt-2 text-lg font-semibold">Hover for Details</p>
          </HoverCardTrigger>
        </div>
        <HoverCardContent className="w-40 bg-white p-4">
          <p className="mb-2 text-sm">
            {nft.price &&
              Math.round(Number(nft.price)).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
          </p>
          <div className="flex items-center">
            <span className="text-xs text-gray-500">
              Created on {new Date(nft.created_at).toLocaleDateString()}
            </span>
          </div>
        </HoverCardContent>
      </HoverCard>}
    </div>
  );
};

export default Card;

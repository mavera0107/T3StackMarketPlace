import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/ui/table";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { subgraphQuery } from "~/utils/query/query";
import { FETCH_RECENT_SOLD } from "~/utils/query/queries";
import { RootState } from "~/redux/store";
import { useSelector } from "react-redux";
interface NFT {
  id: number;
  tokenId: number;
  price: number;
  Description: string;
  ImageUrl: string;
  Name: string;
  to: string;
  from: string;
  blockTimestamp: number;
}
export default function RecentSold() {
  const { AccountAddress } = useSelector(
    (state: RootState) => state.AccountAddress as any,
  );

  const { data: NFTs, isLoading } = useQuery(["soldnft"], Query, {});

  async function Query() {
    const Query = await subgraphQuery(FETCH_RECENT_SOLD(AccountAddress));
    return Query;
  }

  console.log(NFTs);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg text-2xl text-red-500">
        Loading .....
      </div>
    );
  }

  return (
    <div className="relative m-10 flex flex-col items-center justify-center">
      <Table>
        <TableCaption>A list of your recent Sold NFTs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">TokenId</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>price</TableHead>
            <TableHead>Sold At TimeStamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {NFTs?.buys?.map((nft: NFT) => (
            <TableRow key={nft.tokenId}>
              <TableCell className="font-medium">{nft.tokenId}</TableCell>
              <TableCell>{nft.Name}</TableCell>
              <TableCell>{nft.Description.slice(0,13)}</TableCell>
              <TableCell>
                <img
                  src={nft.ImageUrl as any}
                  alt={nft.Name as any}
                  className="h-16 w-16 object-cover"
                />
              </TableCell>
              <TableCell>{nft.to}</TableCell>
              <TableCell>{Number(nft.price) / 1000000} $</TableCell>
              <TableCell>
                {new Date(Number(nft.blockTimestamp) * 1000).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

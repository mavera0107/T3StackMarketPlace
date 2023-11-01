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
import { FETCH_CREATED_NFT } from "~/utils/query/queries";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
interface NFT {
  tokenID: string;
  Name: string;
  Description: string;
  ImageUrl: string;
  createdAtTimestamp: string;
}
export default function CreatedNFTs() {
  const { AccountAddress } = useSelector(
    (state: RootState) => state.AccountAddress as any,
  );

  const {
    data: NFTs,
    isLoading,
    isError,
    refetch,
  } = useQuery(["creatednft"], Query, {});

  async function Query() {
    const Query = await subgraphQuery(FETCH_CREATED_NFT(AccountAddress));
    return Query;
  }

  console.log(NFTs);

  useEffect(() => {
    console.log("Address", AccountAddress);
  });

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
        <TableCaption>A list of your recent Created NFTs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">TokenId</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {NFTs?.tokens?.map((nft: NFT) => (
            <TableRow key={nft.tokenID}>
              <TableCell className="font-medium">{nft.tokenID}</TableCell>
              <TableCell>{nft.Name}</TableCell>
              <TableCell>{nft.Description.slice(0, 13)}</TableCell>
              <TableCell>
                <img
                  src={nft.ImageUrl as any}
                  alt={nft.Name as any}
                  className="h-16 w-16 object-cover"
                />
              </TableCell>
              <TableCell>
                {new Date(
                  Number(nft.createdAtTimestamp) * 1000,
                ).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

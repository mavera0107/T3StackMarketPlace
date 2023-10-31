import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/ui/table";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { subgraphQuery } from "~/utils/query/query";
import {
  FETCH_RECENT_BUY,
  FETCH_CREATED_NFT,
  FETCH_RECENT_SOLD,
} from "~/utils/query/queries";

const Transactions = () => {
  const [selectedValue, setSelectedValue] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    console.log("Selected value:", value);
    setIsOpen(false);
  };

  const {
    data: NFTs,
    isLoading,
    isError,
    refetch,
  } = useQuery(["listedNFTS"], Query, {});

  async function Query() {
    const Query = await subgraphQuery(
      FETCH_CREATED_NFT("0x6386efd4fda4f32f600e55c244ab23e6541ad9da"),
    );
    return Query;
  }

  console.log(NFTs);
  return (
    <div className="relative m-10 flex flex-col items-center justify-center">
      <Select>
        <SelectTrigger
          className="h-[40px] w-[180px] cursor-pointer rounded-xl border-2 border-solid border-green-950 bg-slate-400 p-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedValue ? (
            selectedValue
          ) : (
            <SelectValue placeholder="Select to View" />
          )}
        </SelectTrigger>
        {isOpen && (
          <SelectContent className="absolute left-0 top-full mt-2 w-[180px] rounded-xl bg-gray-400">
            <SelectGroup className="rounded-xl border-2 border-dashed border-green-950 bg-slate-400 p-3">
              <SelectItem
                value="recentsold"
                onSelect={() => handleSelectChange("Recent Sold")}
                className="cursor-pointer p-2 hover:bg-gray-500"
              >
                Recent Sold
              </SelectItem>
              <SelectItem
                value="created NFTs"
                onSelect={() => handleSelectChange("created NFTs")}
                className="cursor-pointer p-2 hover:bg-gray-500"
              >
                Created NFTs
              </SelectItem>
              <SelectItem
                value="recentbought"
                onSelect={() => handleSelectChange("Recent Bought")}
                className="cursor-pointer p-2 hover:bg-gray-500"
              >
                Recent Bought
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        )}
        {selectedValue && (
          <p className="mt-2">Selected Value: {selectedValue}</p>
        )}
      </Select>
      <Table>
        <TableCaption>A list of your recent Sold NFTs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">TokenId</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>USDC Payment</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;

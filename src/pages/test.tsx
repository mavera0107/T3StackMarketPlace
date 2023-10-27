import React, { Fragment, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PaymentMethods from "~/components/Modals/Modal";
import { Button } from "../components/ui/ui/button";
import { api } from "~/utils/api";
import { RootState } from "~/redux/store";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import {
  ERC20_ABI,
  NFT_ABI,
  NFT_Contract_Address,
  USDC_Contract_Address,
} from "~/utils/contants";
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from "@biconomy/paymaster";
import { transferTokens } from "~/server/web3/transfertoken";
import Web3 from "web3";
import { createClient, createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";
const client = createPublicClient({
  chain: polygonMumbai,
  transport: http(),
});

const Test = () => {
  const [balance, setBalance] = useState<any>("");
  const { smartAccount } = useSelector(
    (state: RootState) => state.smartAccountSlice as any,
  );

  async function fetchData() {
    try {
      const result = await client.readContract({
        address: USDC_Contract_Address,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: ["0xEdb8373211332CC6F141CEBB7B8587C7CFb68243"],
      });
      setBalance(result?.toString());
      console.log(result); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function BuyNFT(tokenId: any, price: any) {
    try {
      console.log("smart Account in add nft: ", smartAccount);

      if (!smartAccount) {
        // Handle the case when smartAccount is undefined
        throw new Error("smartAccount is undefined");
      }

      const readProvider = await smartAccount.provider;
      console.log("RPC PROVIDER", readProvider);
      const nftcontract = new ethers.Contract(
        NFT_Contract_Address,
        NFT_ABI,
        readProvider,
      );

      const erc20Contract = new ethers.Contract(
        USDC_Contract_Address,
        ERC20_ABI,
        readProvider,
      );
      // Check if contract.populateTransaction and safeMint are defined
      if (
        !nftcontract.populateTransaction ||
        !nftcontract.populateTransaction.buy
      ) {
        throw new Error("Buy is not defined");
      }

      if (
        !erc20Contract.populateTransaction ||
        !erc20Contract.populateTransaction.approve
      ) {
        throw new Error("approve is not defined");
      }
      console.log("NFT DATA", typeof tokenId, typeof price, "....check trace");
      const populateTxn = await erc20Contract.populateTransaction.approve(
        "0xaF1ED7d23ddE2a7c3Dd5c79B5Eb85de4dF1aD54c",
        price,
      );
      const tx1 = {
        to: USDC_Contract_Address,
        data: populateTxn.data,
      };
      const populatedTxn1 = await nftcontract.populateTransaction.buy(
        tokenId,
        price,
      );
      const tx2 = {
        to: NFT_Contract_Address,
        data: populatedTxn1.data,
      };

      console.log("here before userop");
      let userOp = await smartAccount?.buildUserOp([tx1, tx2]);
      console.log("userop", { userOp });
      const biconomyPaymaster =
        smartAccount?.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
      console.log(biconomyPaymaster);
      console.log(smartAccount);
      let paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
      };
      console.log("check...");
      const paymasterAndDataResponse =
        await biconomyPaymaster.getPaymasterAndData(
          userOp,
          paymasterServiceData,
        );
      console.log("Hello2", paymasterAndDataResponse);

      userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
      console.log("Hello3");
      const userOpResponse = await smartAccount?.sendUserOp(userOp);
      console.log("Hello4", userOpResponse);
      console.log("userOpHash buy", userOpResponse);
      const { receipt } = await userOpResponse.wait(1);
      console.log("txHash", receipt.transactionHash);
      return { sucess: true, transaction_hash: receipt.transactionHash };
    } catch (err) {
      console.error(err);
      console.log(err);
    }
  }

  return (
    <Fragment>
      <Button onClick={() => BuyNFT(14, 12)}>View Price</Button>
    </Fragment>
  );
};

export default Test;

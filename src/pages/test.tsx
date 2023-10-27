import React, { Fragment, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PaymentMethods from "~/components/Modals/Modal";
import { Button } from "../components/ui/ui/button";
import { api } from "~/utils/api";
import { RootState } from "~/redux/store";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { ERC20_ABI, USDC_Contract_Address } from "~/utils/contants";
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from "@biconomy/paymaster";
import { transferTokens } from "~/server/web3/transfertoken";
import Web3 from "web3";

const Test = () => {
  const { smartAccount } = useSelector(
    (state: RootState) => state.smartAccountSlice as any,
  );
  const [showModal, setShowModal] = useState(false);
  const [customAmount, setCustomAmount] = useState("1000000"); // Default value

  const stripePromise: any = loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as any,
  );

  const handleBuyFunc = (props: any) => {
    setShowModal(true);
  };
  const fetchData = async (fromAddress: any, toAddress: any, amount: any) => {
    try {
      let bal = await transferTokens({
        fromAddress: fromAddress,
        toAddress: toAddress,
        amount: amount,
      });
      // You can process the balance here as needed
      console.log(bal);
    } catch (err) {
      console.error(err);
    }
  };
  const handleList = () => {
    // Call fetchData with the custom amount
    fetchData(
      "0xEdb8373211332CC6F141CEBB7B8587C7CFb68243",
      "0x692A040d31449365F17B15e0FeA6816574ffacE7",
      Number(customAmount) * 1000000,
    );

    // The rest of your code for handleList function
    // ...
  };

  useEffect(() => {
    // fetchData();  // You can call fetchData here if needed
  }, []);

  return (
    <Fragment>
      <input
        type="text"
        placeholder="Enter Amount"
        value={customAmount}
        onChange={(e) => setCustomAmount(e.target.value)}
      />
      <Button onClick={handleList}>Transfer Coin</Button>
      {/* The rest of your code */}
    </Fragment>
  );
};

export default Test;

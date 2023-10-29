import { ethers } from "ethers";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "~/components/ui/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/ui/card";
import { Input } from "~/components/ui/ui/input";
import { Label } from "~/components/ui/ui/label";
import { RootState } from "~/redux/store";
import { isAddress } from "viem";
import { ERC20_ABI, USDC_Contract_Address } from "~/utils/contants";
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from "@biconomy/paymaster";
import { useDispatch } from "react-redux";

export default function TransfertoEOA() {
  const { smartAccount } = useSelector(
    (state: RootState) => state.smartAccountSlice as any,
  );
  const [tokenAmount, setTokenAmount] = useState(""); // State for input value
  const [address, setAddress] = useState(""); // State for price input
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleTransferToken() {
    console.log("handleTransferToken called"); // Add this line for debugging
    setIsLoading(true);

    console.log("Smart Account in Transfer", smartAccount);
    try {
      console.log("smart Account in add nft: ", smartAccount);

      if (!smartAccount) {
        // Handle the case when smartAccount is undefined
        throw new Error("smartAccount is undefined");
      }

      const readProvider = await smartAccount.provider;
      console.log("RPC PROVIDER", readProvider);
      const contract = new ethers.Contract(
        USDC_Contract_Address,
        ERC20_ABI,
        readProvider,
      );

      // Check if contract.populateTransaction and safeMint are defined
      if (
        !contract.populateTransaction ||
        !contract.populateTransaction.transfer
      ) {
        throw new Error("safeMint is not defined");
      }
      const price = Number(tokenAmount) * 1000000;
      const populatedTxn = await contract.populateTransaction.transfer(
        address,
        price,
      );

      const calldata = populatedTxn.data;
      const tx1 = {
        to: USDC_Contract_Address,
        data: calldata,
      };

      console.log("here before userop");
      let userOp = await smartAccount?.buildUserOp([tx1]);
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
      console.log("userOpHash", userOpResponse);
      const { receipt } = await userOpResponse.wait(1);
      console.log("txHash", receipt.transactionHash);
      if (userOpResponse) {
        setIsLoading(false);
        toast.success("Token Transferred Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTokenAmount(""); // Clear token amount input
        setAddress("");
      }
    } catch (err) {
      console.error(err);
      console.log(err);
      setError(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Transfer Amount To EOA</CardTitle>
          <CardDescription>
            Just Put In how Many Token You Want to transfer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Token Amount</Label>
                <Input
                  id="name"
                  placeholder="total amount in number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Public Address of EOA</Label>
                <Input
                  id="price"
                  placeholder="public EOA Address"
                  value={address}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    // Check if inputValue meets your condition(s)
                    if (isAddress(inputValue)) {
                      // Example condition: inputValue should have a length of at least 5 characters
                      setAddress(inputValue); // Set the address state if the condition is met
                    } else {
                      setError(true);
                    }
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className="rounded-xl bg-blue-400"
            onClick={handleTransferToken}
            disabled={isLoading}
          >
            {isLoading ? "Please wait" : "Transfer"}
          </Button>
        </CardFooter>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

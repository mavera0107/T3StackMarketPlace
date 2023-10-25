import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { api } from "~/utils/api";
import { Button } from "../ui/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/ui/dialog";

import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
  PaymasterFeeQuote,
} from "@biconomy/paymaster";
import { Debug, NFT_ABI, NFT_Contract_Address } from "~/utils/contants";

import { ethers } from "ethers";
import { any } from "zod";
import { toast } from "react-toastify";

const StripeForm = ({
  isModal,
  setIsModal,
  nft,
  setBankTransfer,
  bankTransfer,
  refetch,
}: any) => {
  const { smartAccount } = useSelector(
    (state: RootState) => state.smartAccountSlice as any,
  );
  console.log("Smart Account1", smartAccount);

  console.log(nft, "1 nft record");
  const elements: any = useElements();
  const stripe: any = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [user, setUser] = useState({
    id: "",
    wallet_address: "",
  });

  useEffect(() => {
    let isUser: any = JSON.parse(localStorage.getItem("user") as any);
    setUser(isUser);
  }, []);

  console.log(nft, "nft.store_id");

  console.log(user);
  const updateNFTs = api.nft.updateNFTListing.useMutation({
    onSuccess: (res: any) => {
      console.log(res, "Login result");
      refetch();
      if (res) {
        toast.success("NFT Listing Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setIsLoading(false);
    },
    onError: (err: any) => {
      toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false);
      console.log(err.message, "NFT Creation Error");
    },
  });
  // const updateUserBalance = trpc.user.updateUser.useMutation({});

  const handleSubmit = async (e: any) => {
    setBtnDisabled(true);
    e.preventDefault();
    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement),
    );
    console.log(token, error, "token, error");

    if (error !== undefined) {
      setBtnDisabled(true);
      setTimeout(function () {
        setBtnDisabled(false);
      }, 2000);

      toast.error(error["message"], {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const obj = {
        token: token.id,
        price: +nft.price,
      };
      console.log(obj, "object in stripe form");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}paymentIntent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          },
        );
        console.log({ response }, "response");

        if (!response.ok) {
          throw new Error("API request failed");
        }

        // const transferResponse = await tranferNFT();

        // if (transferResponse?.sucess) {
        //   const updatedObj = {
        //     price: nft.price,
        //     token_id: nft.token_id,
        //     is_listed: false,
        //   };
        // const updateRes = await updateNFTs.mutateAsync(updatedObj);
        // console.log(updateRes, "updatec Nft response");

        setIsModal(false);

        setBankTransfer(false);

        //   toast({
        //     title: "Transaction Completed",
        //     description: transferResponse.transaction_hash,
        //     status: "success",
        //     isClosable: true,
        //     position: "top-right",
        //     duration: 3000,
        //   });
        //   refetch();
        //   return { sucess: true };
        // } else {
        //   throw new Error("Transaction Failed");
        // }
        // Api Response Complete
        // const responseData = await response.json();

        // // Update User Data After Buy NFT

        // Update User Balance
        // const updateUserdObj = {
        //   user_id: nft.store_id,
        //   balance:
        //     getUserData?.user?.balance > 0
        //       ? getUserData?.user?.balance + +nft.price
        //       : +nft.price,
        // };
        // const updateUserRes = await updateUserBalance.mutateAsync(
        //   updateUserdObj
        // );

        // return responseData;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  };

  // async function tranferNFT() {
  //   try {
  //     console.log("smart Account in add nft: ", smartAccount);

  //     // Create an Ethers Contract instance for USDC
  //     const readProvider = smartAccount.provider;
  //     console.log("READ Provider : ", readProvider);
  //     // make contract instance
  //     const nftMarketContract = new ethers.Contract(
  //       NFT_MARKET_ADDRESS,
  //       NFTMarketABI,
  //       readProvider,
  //     );
  //     console.log("check ERROR in stripe");
  //     // Create the calldata for our UserOperation
  //     const populatedTransferTxn =
  //       await nftMarketContract.populateTransaction.transferNFT(
  //         NFT_CONTRCAT_ADDRESS,
  //         user.wallet_address,
  //         nft.nft_owner,
  //         nft.token_id,
  //       );
  //     console.log("check ERROR in stripe2");
  //     const calldata = populatedTransferTxn.data;
  //     // Build the UserOperation
  //     const userOp = await smartAccount.buildUserOp([
  //       {
  //         to: NFT_MARKET_ADDRESS,
  //         data: calldata,
  //       },
  //     ]);

  //     console.log("USER OP : ", userOp);

  //     // Get the paymaster fee quote from Biconomy
  //     const biconomyPaymaster =
  //       smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

  //     let paymasterServiceData: SponsorUserOperationDto = {
  //       mode: PaymasterMode.SPONSORED,
  //     };

  //     const paymasterAndDataResponse =
  //       await biconomyPaymaster.getPaymasterAndData(
  //         userOp,
  //         paymasterServiceData,
  //       );

  //     userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

  //     const userOpResponse = await smartAccount.sendUserOp(userOp);
  //     const { receipt } = await userOpResponse.wait(1);
  //     console.log("txHash..", receipt);
  //     settransferTx(receipt.transactionHash);
  //     return { sucess: true, transaction_hash: receipt.transactionHash };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleCloseAction = () => {
    setIsModal(false);
    setBankTransfer(false);
  };

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>Checkout</DialogHeader>
        <DialogTrigger onClick={handleCloseAction} />
        <DialogContent id="payment-form">
          <form>
            <CardElement />
          </form>
        </DialogContent>
        <DialogFooter>
          <Button size={"sm"} onClick={handleCloseAction}>
            Close
          </Button>
          {btnDisabled ? (
            <Button color="temp-10" type="submit">
              Buy NFT
            </Button>
          ) : (
            <Button color="temp-10" type="submit" onClick={handleSubmit}>
              Buy NFT
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default StripeForm;

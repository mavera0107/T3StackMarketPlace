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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  background,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
  PaymasterFeeQuote,
} from "@biconomy/paymaster";

// import {
//   NFT_MARKET_ADDRESS,
//   NFTMarketABI,
//   NFT_CONTRCAT_ADDRESS,
// } from "../constants";
import { ethers } from "ethers";
import { any } from "zod";

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
  const toast = useToast();
  const stripe: any = useStripe();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { onOpen, onClose } = useDisclosure();
  const [mintTx, setMintTx] = useState("");
  const [user, setUser] = useState({
    id: "",
    wallet_address: "",
  });

  useEffect(() => {
    let isUser: any = JSON.parse(localStorage.getItem("user") as any);
    setUser(isUser);
  }, []);

  console.log(nft[0].price, "nft.store_id");
  // Get Data
  // const { data: getUserData, userReftch } = trpc.user?.getUserData.useQuery(
  //   { id: nft?.store_id },
  //   {
  //     refetchOnWindowFocus: true,
  //     enabled: nft?.store_id ? true : false,
  //   }
  // );
  // console.log(getUserData?.user?.balance, "getUserData");

  console.log(user);
  // const updateNFTs = api.nft.updateNFTListing.useMutation({});
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

      toast({
        title: error["message"],
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 3000,
      });
    } else {
      const obj = {
        token: token.id,
        price: +nft[0].price,
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
        //     nft_id: nft.id,
        //     store_id: user?.id,
        //     nft_owner: user?.wallet_address,
        //     status: false,
        //   };
        // const updateRes = await updateNFTs.mutateAsync(updatedObj);
        // console.log(updateRes, "updatec Nft response");

        setIsModal(false);

        setBankTransfer(false);

        // toast({
        //   title: "Transaction Completed",
        //   description: transferResponse.transaction_hash,
        //   status: "success",
        //   isClosable: true,
        //   position: "top-right",
        //   duration: 3000,
        // });
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
  //     setMintTx(receipt.transactionHash);
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
    <Modal
      isOpen={isModal}
      onClose={() => {
        setIsModal(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Checkout</ModalHeader>
        <ModalCloseButton onClick={handleCloseAction} />
        <ModalBody id="payment-form">
          <form>
            <CardElement />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            size={"sm"}
            onClick={handleCloseAction}
          >
            Close
          </Button>
          {btnDisabled ? (
            <Button
              isLoading
              loadingText="Buy NFT"
              spinnerPlacement="start"
              bg="green-10"
              color="temp-10"
              borderRadius={5}
              type="submit"
            >
              Buy NFT
            </Button>
          ) : (
            <Button
              bg="green-10"
              color="temp-10"
              borderRadius={5}
              type="submit"
              onClick={handleSubmit}
            >
              Buy NFT
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StripeForm;

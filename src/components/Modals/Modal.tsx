import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
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
import StripeForm from "../StripForm/StripeForm";
// import BbcForm from "./Modals/BbcForm";

const PaymentMethods = ({ isModal, setIsModal, nft, stripe, refetch }: any) => {
  console.log(nft, "1 nft record");

  const [bankTransfer, setBankTransfer] = useState(false);

  const handlePayment = (type: any) => {
    if (type === "bank") {
      setBankTransfer(true);
    }
  };

  return (
    <Dialog>
      <DialogHeader>Payment Methods</DialogHeader>
      <DialogTrigger
        onClick={() => {
          setIsModal(false);
        }}
      />
      <DialogContent>
        <div className="flex flex-col items-center">
          <div
            onClick={() => handlePayment("bank")}
            className="h-120px border-l-5 w-200px mb-4 cursor-pointer rounded-lg border-blue-500 bg-white shadow-md"
          >
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-xl">BANK TRANSFER</div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogFooter>
        <Button
          size={"sm"}
          onClick={() => {
            setIsModal(false);
          }}
        >
          Close
        </Button>
      </DialogFooter>

      {bankTransfer ? (
        <Elements stripe={stripe}>
          <StripeForm
            isModal={isModal}
            setIsModal={setIsModal}
            nft={nft}
            bankTransfer={bankTransfer}
            setBankTransfer={setBankTransfer}
            refetch={refetch}
          />
        </Elements>
      ) : (
        <></>
      )}
    </Dialog>
  );
};

export default PaymentMethods;

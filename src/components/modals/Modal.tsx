import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Button } from "../ui/ui/button";
import BuyFromToken from "./buyfromTokenmodal";
import StripeForm from "../stripForm/StripeForm";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/ui/dialog";

const PaymentMethods = ({ isModal, setIsModal, nft, stripe, refetch }: any) => {
  console.log(nft, "1 nft record");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showStripeForm, setShowStripeForm] = useState(false); // Initialize to false
  const [tokentransfer, settokentransfer] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
    setShowStripeForm(true);
    settokentransfer(true); // Set to true when opening the dialog
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setShowStripeForm(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="rounded-xl bg-blue-400"
            onClick={openDialog}
          >
            Payment Method
          </Button>
        </DialogTrigger>
        {isDialogOpen && (
          <DialogContent className="bg-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Payment Methods</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              {showStripeForm && (
                <div className="mt-3">
                  <Elements stripe={stripe}>
                    <StripeForm
                      isModal={isModal}
                      setIsModal={setIsModal}
                      nft={nft}
                      refetch={refetch}
                    />
                  </Elements>
                </div>
              )}
              {tokentransfer && (
                <div className="mt-3">
                  <Elements stripe={stripe}>
                    <BuyFromToken
                      isModal={isModal}
                      setIsModal={setIsModal}
                      nft={nft}
                      refetch={refetch}
                    />
                  </Elements>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
export default PaymentMethods;

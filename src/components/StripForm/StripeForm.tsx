import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { api } from "~/utils/api";
import { Button } from "../ui/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
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
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const StripeForm = ({
  isModal,
  setIsModal,
  nft,
  setBankTransfer,
  refetch,
}: any) => {
  const { smartAccount } = useSelector(
    (state: RootState) => state.smartAccountSlice as any,
  );
  console.log("Smart Account1", smartAccount);

  console.log(nft, "1 nft record");
  const elements: any = useElements();
  const stripe: any = useStripe();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [user, setUser] = useState({
    id: "",
    wallet_address: "",
  });

  useEffect(() => {
    let isUser: any = JSON.parse(localStorage.getItem("user") as any);
    setUser(isUser);
  }, []);

  console.log(nft.price, "nft.store_id");
  console.log(user);

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

      toast.error("ERROR!", {
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

        setIsModal(false);
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsModal(true)}>
          Bank Transfer{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        <form>
          <CardElement />
        </form>
        <DialogFooter>
          {btnDisabled ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Buy NFT
            </Button>
          ) : (
            <Button
              className="rounded-xl bg-green-300"
              color="temp-10"
              type="submit"
              onClick={handleSubmit}
            >
              Buy NFT
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StripeForm;

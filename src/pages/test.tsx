// "use client";
// import React, { Fragment, useEffect, useState } from "react";
// import { api } from "~/utils/api";
// import { CreateUserInput, createUserSchema } from "~/schema/user";
// import { Button } from "~/components/ui/ui/button";
// import { Loader2 } from "lucide-react";
// import Card from "~/components/card/nftcard";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loadStripe } from "@stripe/stripe-js";
// import Modal from "../components/Modals/Modal";
// import PaymentMethods from "~/components/Modals/Modal";

// const test = () => {
//   // const [address, setAddress] = useState("");
//   // const createnft = api.nft.createNFT.useMutation({
//   //   onSuccess(res: any) {
//   //     console.log(res, "Login result");
//   //   },
//   //   onError: (err: any) => {
//   //     toast.error(err.message, {
//   //       position: "top-right",
//   //       autoClose: 3000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //       progress: undefined,
//   //       theme: "light",
//   //     });
//   //     console.log(err.message, "login err");
//   //   },
//   // });

//   // const updateUser = api.user.updateUser.useMutation({
//   //   onSuccess(res: any) {
//   //     console.log(res, "Login result");
//   //   },
//   //   onError: (err: any) => {
//   //     toast.error(err.message, {
//   //       position: "top-right",
//   //       autoClose: 3000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //       progress: undefined,
//   //       theme: "light",
//   //     });
//   //     console.log(err.message, "login err");
//   //   },
//   // });
//   // async function nftCreated() {
//   //   let value: any = {
//   //     owner_id: "65365e66e6043ce7b5e3b5be",
//   //     nft_owner: "0xac37d6410bc2c09e7d2e6279fa3574120658abd2",
//   //     nft_creator: "0xac37d6410bc2c09e7d2e6279fa3574120658abd2",
//   //     price: "0",
//   //     ipfs_url:
//   //       "https://ipfs.io/ipfs/QmXeVtx8Hvn4EkmcbS7fLXfXNs3AUpu6bvE6QV6opDHQUk",
//   //     name: "Splash",
//   //     description: "Ripple Effect for Splash Colors.",
//   //     token_id: "1",
//   //     is_listed: false,
//   //   };

//   //   let response = await createnft.mutateAsync(value);
//   //   console.log("Response", response);

//   //   if (response) {
//   //     toast.success("Signin Successfully!", {
//   //       position: "top-right",
//   //       autoClose: 2000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //       progress: undefined,
//   //       theme: "light",
//   //     });
//   //   }
//   // }

//   // async function UpdateUser() {
//   //   let value: any = {
//   //     wallet_address: "0xac37d6410bc2c09e7d2e6279fa3574120658abd2",
//   //     full_name: "Waqar Khan",
//   //   };

//   //   let response = await updateUser.mutateAsync(value);
//   //   console.log("Response", response);

//   //   if (response) {
//   //     toast.success("Signin Successfully!", {
//   //       position: "top-right",
//   //       autoClose: 2000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //       progress: undefined,
//   //       theme: "light",
//   //     });
//   //   }
//   // }

//   // const updateNFt = api.nft.updateNFTListing.useMutation({
//   //   onSuccess(res: any) {
//   //     console.log(res, "Login result");
//   //   },
//   //   onError: (err: any) => {
//   //     toast.error(err.message, {
//   //       position: "top-right",
//   //       autoClose: 3000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //       progress: undefined,
//   //       theme: "light",
//   //     });
//   //     console.log(err.message, "login err");
//   //   },
//   // });

//   // async function NFTList() {
//   //   let value: any = {
//   //     token_id: String(1),
//   //     price: "10",
//   //     is_listed: true,
//   //   };

//   //   let response = await updateNFt.mutateAsync(value);
//   //   console.log("Response", response);

//   //   if (response) {sk_test_51O48ccFDZXYle0D2EGEfcEcNQscWhwIoAjMa4L1Wlc1mnM0QS6fHI4WCtz1SDCN8bloknI73drUwZiwoG39qLqlG00ANb5H9nB
//   //     toast.success("Signin Successfully!", {
//   //       position: "top-right",
//   //       autoClose: 2000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //       progress: undefined,
//   //       theme: "light",
//   //     });
//   //   }
//   // }

//   // const BuyNFT = api.nft.updateBuyNFT.useMutation({
//   //   onSuccess(res: any) {
//   //     console.log(res, "Login result");
//   //   },
//   //   onError: (err: any) => {
//   //     toast.error(err.message, {
//   //       position: "top-right",
//   //       autoClose: 3000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //       progress: undefined,
//   //       theme: "light",
//   //     });
//   //     console.log(err.message, "login err");
//   //   },
//   // });

//   // async function NFTBuy() {
//   //   let value: any = {
//   //     token_id: "1",
//   //     owner_id: "65375c08a9ac4f73945d4b4d",
//   //     wallet_address: "0xBFaf3A48281A901Ca8eB0498F9A1296785474141",
//   //   };

//   //   let response = await BuyNFT.mutateAsync(value);
//   //   console.log("Response", response);

//   //   if (response) {
//   //     toast.success("Signin Successfully!", {
//   //       position: "top-right",
//   //       autoClose: 2000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //       progress: undefined,
//   //       theme: "light",
//   //     });
//   //   }
//   // }
//   // // const create = api.user.create.useMutation(createUserSchema){
//   // // c
//   // // };
//   // // const { data: user } = api.user.get.useQuery({
//   // //   wallet_address: "0x94544c10940a8e30fd0951bd81afa17322ca2ed4",
//   // // });
//   // function getUser() {
//   //   const user = localStorage.getItem("user");
//   //   if (user) {
//   //     const data = JSON.parse(user);
//   //     let wallet_address = data.wallet_address;
//   //     setAddress(wallet_address);
//   //     return wallet_address;
//   //   }
//   // }

//   // useEffect(() => {
//   //   getUser();
//   // }, []);;
//   // const handleClick = async () => {
//   //   const key = process.env.NEXT_PUBLIC_STRIPE_KEY;
//   //   const stripe = await loadStripe(key!); // Replace with your actual publishable key

//   //   const response = await fetch("/api/paymentIntent", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({
//   //       nft: "1",
//   //       name: "Product Name",
//   //       description: "Product Description",
//   //       imageurl: "Image URL",
//   //       userId: "65365e66e6043ce7b5e3b5be",
//   //     }),
//   //   });

//   //   const session = await response.json();

//   //   // Redirect to the Stripe checkout page
//   //   const { error } = await stripe.redirectToCheckout({
//   //     sessionId: session.id,
//   //   });

//   //   if (error) {
//   //     console.error(error);
//   //   }
//   // };
//   const [showModal, setShowModal] = useState<any>(false);
//   const stripePromise: any = loadStripe(
//     process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as any,
//   );
//   return (
//     <Fragment>
//       Hello
//       <Modal
//         stripe={stripePromise}
//         isModal={showModal}
//         setIsModal={setShowModal}
//         nft={[
//           {
//             id: "1",
//             nft_creator: "CreatorName1",
//             nft_owner: "OwnerName1",
//             price: "100",
//             ipfs_url: "https://example.com/ipfs-hash1",
//             name: "Sample NFT 1",
//             description: "This is a sample NFT description 1.",
//             token_id: "123456",
//             is_listed: true,
//             created_at: new Date(),
//             updated_at: new Date(),
//             owner_id: "user123",
//           },
//         ]}
//         refetch={() => {
//           console.log("Hello");
//         }}
//       />
//       {/* <Modal
//         stripe={stripePromise}
//         isModal={showModal}
//         setIsModal={setShowModal}
//         nft={}
//         refetch={() => {
//           console.log("test");
//         }}
//       /> */}
//     </Fragment>
//   );
// };

// export default test;
import React, { Fragment, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PaymentMethods from "~/components/Modals/Modal";
import { Button } from "../components/ui/ui/button";
import { api } from "~/utils/api";

const Test = () => {
  const [showModal, setShowModal] = useState(false);
  const stripePromise: any = loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as any,
  );

  const handleBuyFunc = (props: any) => {
    setShowModal(true);
    //  setSelectedNft(props);
  };
 
  return (
    <Fragment>
      Hello
      <PaymentMethods
        stripe={stripePromise}
        isModal={showModal}
        setIsModal={setShowModal}
        nft={[
          {
            id: "1",
            nft_creator: "CreatorName1",
            nft_owner: "OwnerName1",
            price: "100",
            ipfs_url: "https://example.com/ipfs-hash1",
            name: "Sample NFT 1",
            description: "This is a sample NFT description 1.",
            token_id: "123456",
            is_listed: true,
            created_at: new Date(),
            updated_at: new Date(),
            owner_id: "user123",
          },
        ]}
        refetch={() => {
          console.log("Hello");
        }}
      />
      <Button onClick={handleBuyFunc}>Try</Button>
    </Fragment>
  );
};

export default Test;

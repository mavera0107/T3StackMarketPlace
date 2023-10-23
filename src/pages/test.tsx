import React, { Fragment, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { CreateUserInput, createUserSchema } from "~/schema/user";
import { Button } from "~/components/ui/ui/button";
import { Loader2 } from "lucide-react";
import Card from "~/components/card/nftcard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const test = () => {
  const [address, setAddress] = useState("");
  const createnft = api.nft.createNFT.useMutation({
    onSuccess(res: any) {
      console.log(res, "Login result");
    },
    onError: (err: any) => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err.message, "login err");
    },
  });

  const updateUser = api.user.updateUser.useMutation({
    onSuccess(res: any) {
      console.log(res, "Login result");
    },
    onError: (err: any) => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err.message, "login err");
    },
  });
  async function nftCreated() {
    let value: any = {
      owner_id: "65365e66e6043ce7b5e3b5be",
      nft_owner: "0xac37d6410bc2c09e7d2e6279fa3574120658abd2",
      nft_creator: "0xac37d6410bc2c09e7d2e6279fa3574120658abd2",
      price: "0",
      ipfs_url:
        "https://ipfs.io/ipfs/QmXeVtx8Hvn4EkmcbS7fLXfXNs3AUpu6bvE6QV6opDHQUk",
      name: "Splash",
      description: "Ripple Effect for Splash Colors.",
      token_id: "1",
      is_listed: false,
    };

    let response = await createnft.mutateAsync(value);
    console.log("Response", response);

    if (response) {
      toast.success("Signin Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  async function UpdateUser() {
    let value: any = {
      wallet_address: "0xac37d6410bc2c09e7d2e6279fa3574120658abd2",
      full_name: "Waqar Khan",
    };

    let response = await updateUser.mutateAsync(value);
    console.log("Response", response);

    if (response) {
      toast.success("Signin Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const updateNFt = api.nft.updateNFTListing.useMutation({
    onSuccess(res: any) {
      console.log(res, "Login result");
    },
    onError: (err: any) => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err.message, "login err");
    },
  });

  async function NFTList() {
    let value: any = {
      token_id: "1",
      price: "10",
      is_listed: true,
    };

    let response = await updateNFt.mutateAsync(value);
    console.log("Response", response);

    if (response) {
      toast.success("Signin Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const BuyNFT = api.nft.updateBuyNFT.useMutation({
    onSuccess(res: any) {
      console.log(res, "Login result");
    },
    onError: (err: any) => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err.message, "login err");
    },
  });

  async function NFTBuy() {
    let value: any = {
      token_id: "1",
      owner_id: "abbbc34242",
      wallet_address: "0xBFaf3A48281A901Ca8eB0498F9A1296785474141",
    };

    let response = await BuyNFT.mutateAsync(value);
    console.log("Response", response);

    if (response) {
      toast.success("Signin Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  // const create = api.user.create.useMutation(createUserSchema){
  // c
  // };
  // const { data: user } = api.user.get.useQuery({
  //   wallet_address: "0x94544c10940a8e30fd0951bd81afa17322ca2ed4",
  // });
  function getUser() {
    const user = localStorage.getItem("user");
    if (user) {
      const data = JSON.parse(user);
      let wallet_address = data.wallet_address;
      setAddress(wallet_address);
      return wallet_address;
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Fragment>
      Hello
      <div>
        <Button onClick={nftCreated}>Create NFT</Button>
        <Button onClick={UpdateUser}>Name Update</Button>
        <Button onClick={NFTList}>NFT List</Button>
        <Button onClick={NFTBuy}>NFT Buy</Button>
      </div>
    </Fragment>
  );
};

export default test;

import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import PaymentMethods from "~/components/Modals/Modal";
import { api } from "~/utils/api";

const NFTdetails = () => {
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <div>NFT not found</div>;
  }

  const { data, refetch } = api.nft.getNFTById.useQuery({ id: id });

  if (!data || !data.response) {
    return <div>NFT not found</div>;
  }

  const { response } = data;
  const handleBuyFunc = (props: any) => {
    setShowModal(true);
    //  setSelectedNft(props);
  };
  const stripePromise: any = loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as any,
  );
  return (
    <div className="min-w-fullflex-row m-16 flex h-72 items-center justify-center">
      <div>
        <img
          src={response.ipfs_url || undefined}
          alt={response.name || "Image Url"}
          className="mb-4 h-60 w-full rounded-xl object-cover"
        />
      </div>
      <div className="p-5">
        <h2 className="mb-2 text-xl font-bold">Name : {response.name}</h2>
        <p className="mb-4 font-bold text-gray-500">
          Description : {response.description}
        </p>
        <h2 className="mb-2 font-bold">
          Creator {response.nft_creator?.slice(0, 8)}...
          {response.nft_creator?.slice(16, 32)}
        </h2>
        <h2 className="mb-2 font-bold">
          Creator {response.nft_owner?.slice(0, 8)}...
          {response.nft_owner?.slice(16, 32)}
        </h2>
        <h1 className="font-bold">Price: {response.price} $</h1>

        <PaymentMethods
          stripe={stripePromise}
          isModal={showModal}
          setIsModal={setShowModal}
          nft={response}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default NFTdetails;

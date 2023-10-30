// import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PaymentMethods from "~/components/modals/Modal";
import { Skeleton } from "~/components/ui/ui/skeleton";
import { api } from "~/utils/api";

const NFTdetails = () => {
  const [user, setUser] = useState<any>({
    wallet_address: "",
  });
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <div>NFT not found</div>;
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isUser = localStorage.getItem("user");
      if (isUser) {
        const userData = JSON.parse(isUser);
        setUser(userData);
      }
    }
  }, []);
  const { data, refetch } = api.nft.getNFTById.useQuery({ id: id });

  if (!data || !data.response) {
    return (
      <div className="w-50 mb-32 mt-24 flex h-52 items-center justify-center">
        <div className="rounded-xl border border-gray-300 p-4 shadow-lg">
          <Skeleton className="mb-4 h-40 w-40 rounded-xl" />
          <Skeleton className="mb-2 h-6 w-48" />
          <Skeleton className="mb-4 h-4 w-32" />
          <Skeleton className="h-6 w-48" />
        </div>
      </div>
    );
  }

  const { response } = data;

  const stripePromise: any = loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as any,
  );

  return (
    <div className="m-16 flex h-72 min-w-full flex-row items-center justify-center">
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
        <h1 className="font-bold">
          Price: {response.price === "0" ? "Not Listed" : `${response.price} $`}
        </h1>
        {response.is_listed && response.nft_owner !== user.wallet_address ? (
          <PaymentMethods
            stripe={stripePromise}
            isModal={showModal}
            setIsModal={setShowModal}
            nft={response}
            refetch={refetch}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NFTdetails;

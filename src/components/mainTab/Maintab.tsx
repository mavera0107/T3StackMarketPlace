import React, { useEffect, useState } from "react";
import Card from "~/components/card/nftcard";
import { api } from "~/utils/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MainTabs = () => {
  type NFTItem = {
    id: string;
    nft_creator: string | null;
    nft_owner: string | null;
    price: string | null;
    ipfs_url: string | null;
    name: string | null;
    description: string | null;
    token_id: string | null;
    is_listed: boolean | null;
    created_at: Date;
    updated_at: Date;
    owner_id: string;
  };
  type NFTList = NFTItem[] | undefined;

  function* createNFTIterable(
    data: NFTList,
  ): Generator<NFTItem, void, undefined> {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const nftItem = data[i];
        if (nftItem !== undefined) {
          yield nftItem;
        }
      }
    }
  }

  // Usage
  const {
    data: UserNFTListing,
    error,
    refetch,
  } = api.nft.getNFTListing.useQuery();

  const nftIterable = createNFTIterable(UserNFTListing);
  const shuffledNfts2: NFTItem[] = [...nftIterable].sort(
    () => Math.random() - 0.5,
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 5,
      partialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
      partialVisibilityGutter: 0,
    },
  };

  return (
    <div className="m-auto max-w-full p-6">
      <div dir="ltr" data-orientation="horizontal">
        <div className="mb-8 mt-2 flex items-center justify-center">
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="inline-flex h-10 items-center justify-center rounded-md bg-muted text-muted-foreground"
            tabIndex={0}
            data-orientation="horizontal"
          ></div>
        </div>
        <div
          role="tabpanel"
          tabIndex={-1}
          className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div>
            <div className="justify-center">
              <div className="flex-col text-center">
                <h1 className="text-3xl">
                  "Experience Art In A New Dimension"
                </h1>
              </div>
              <div className="flex-col text-center">
                <div className="">
                  <h2 className="text-xl">
                    Find unique NFTs that capture the essence of creativity and
                    own a piece of art history
                  </h2>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl">Top Picks for Today</h1>
              <div className="mx-1 mt-4"></div>
              <Carousel
                responsive={responsive}
                infinite={true}
                arrows={false}
                additionalTransfrom={0}
                autoPlay
                draggable
                minimumTouchDrag={80}
                autoPlaySpeed={5000}
                customTransition="all 1s linear"
                transitionDuration={500}
                showDots={false}
                containerClass="carousel-container"
                itemClass="carousel-item mx-2"
                partialVisible={true}
              >
                {shuffledNfts2?.map((nft) => (
                  <Card
                    key={nft.id}
                    nft={nft}
                    mynftRefetch={refetch}
                    maintab={true}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTabs;

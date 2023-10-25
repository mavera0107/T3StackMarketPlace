import dynamic from "next/dynamic";

const NFTList = dynamic(
  () => import("../components/marketplace/Listingonmarket"),
  {
    ssr: false,
  },
);
// Define the correct typing for userPage
const NFT = NFTList;

export default function NftList() {
  return <NFT />;
}

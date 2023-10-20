import dynamic from "next/dynamic";

const MintNFT = dynamic(() => import("../components/createNFT/mintingpage"), {
  ssr: false,
});

export default function UserLogin() {
  return <MintNFT />;
}

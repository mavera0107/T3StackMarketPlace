import dynamic from "next/dynamic";

const MintNFT = dynamic(() => import("../components/createNFT/Mintingpage"), {
  ssr: false,
});

export default function UserLogin() {
  return <MintNFT />;
}

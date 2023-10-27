import dynamic from "next/dynamic";

const transfer = dynamic(() => import("../components/EoaTransfer/transfer"), {
  ssr: false,
});

// Define the correct typing for userPage
const UsertransferPage = transfer;

export default function UserLogin() {
  return <UsertransferPage />;
}

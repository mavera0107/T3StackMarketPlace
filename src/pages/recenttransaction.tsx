import dynamic from "next/dynamic";

const transactions = dynamic(
  () => import("../components/recentTransaction/Transactions"),
  {
    ssr: false,
  },
);

// Define the correct typing for userPage
const TransactionPage = transactions;

export default function UserLogin() {
  return <TransactionPage />;
}

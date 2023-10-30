import { createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";
import { ERC20_ABI, USDC_Contract_Address } from "./contants";
const client = createPublicClient({
  chain: polygonMumbai,
  transport: http(),
});
export async function fetchData(wallet_address: any) {
  try {
    const result = await client.readContract({
      address: USDC_Contract_Address,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [wallet_address],
    });
    if (result === undefined || result === null) {
      console.error("Error: Result is undefined or null");
      return;
    }
    const res: string = result?.toString();
    // Convert the result to a number, handle precision, and then format it as a string with maximum 6 decimal places
    const balanceNumber = parseFloat(res) / 1000000;
    const formattedBalance = balanceNumber.toFixed(6); // Set the desired number of decimal places

    // Remove trailing zeroes and convert the number back to string
    const balanceString = parseFloat(formattedBalance).toString();

    return balanceString; // Log the formatted balance without trailing zeroes
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";
import { ERC20_ABI, USDC_Contract_Address } from "~/utils/contants";
const client = createPublicClient({
  chain: polygonMumbai,
  transport: http(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log({ req }, "REQUEST FROM API for Balance");
  const { wallet_address } = req.body;
  console.log("hit api", wallet_address);

  if (req.method === "GET") {
    try {
      const result = await client.readContract({
        address: USDC_Contract_Address,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [`${wallet_address}`],
      });
      console.log(result); // Update the state with the fetched data
      return res.send({ data: result, success: true });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).send({ data: { error }, success: false });
    }
    // res.status(200).json({ message: "POST request received" });
  } else {
    console.log("else");
  }
  // return mainRoutes(req, res);
}

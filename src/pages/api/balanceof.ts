import { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log({ req }, "REQUEST FROM API for balance");
  const { wallet_address } = req.body;
  const rpcURl = process.env.NEXT_PUBLIC_Mumbai_RPC_URL as any;
  const httpProvider = new Web3.providers.HttpProvider(rpcURl);
  const web3Client = new Web3(httpProvider);
  const minABI = [
    // balanceOf
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ];

  const tokenAddress = process.env.NEXT_PUBLIC_ERC20_Contract_Address as any;
  const contract = new web3Client.eth.Contract(minABI, tokenAddress) as any;
  const result = await contract.methods.balanceOf(wallet_address).call();
  const resultInEther = web3Client.utils.fromWei(result, "ether");
  console.log(`Balance in wei: ${result}`);

  console.log(`Balance in ether: ${resultInEther}`);

  return res.status(200).send({
    data: resultInEther,
    success: true,
  });
}

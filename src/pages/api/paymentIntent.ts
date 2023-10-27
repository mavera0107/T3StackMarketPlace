import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log({ req }, "REQUEST FROM API");
  const { token, price } = req.body;
  console.log("hit api", token, price);

  if (req.method === "POST") {
    transferPrice(token, price, res);
    // res.status(200).json({ message: "POST request received" });
  } else {
    console.log("else");
  }
  // return mainRoutes(req, res);
}

async function transferPrice(token: any, price: any, res: any) {
  try {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY as any, {
      // https://github.com/stripe/stripe-node#configuration
      apiVersion: "2023-10-16",
      // Register this as an official Stripe plugin.
      // https://stripe.com/docs/building-plugins#setappinfo
      appInfo: {
        name: "Testing Stripe",
        version: "0.1.0",
      },
    });
    console.log(stripe, "stripe for data");

    const charge = await stripe.charges.create({
      amount: Math.round(price * 100),
      currency: "usd",
      description: "",
      source: token,
    });
    console.log(charge, "charge for data");

    // step 3: create token log.
    if (charge.status === "succeeded") {
      return res
        .status(200)
        .send({ data: "Payment Successfull", success: true });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({ data: error.message, success: false });
  }
}

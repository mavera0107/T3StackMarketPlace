// import Stripe from "stripe";
// import { NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
//   typescript: true,
// });

// const corsHeader = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET,POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function OPTIONS() {
//   return NextResponse.json({}, { headers: corsHeader });
// }

// export async function POST(req: Request) {
//   const { nft, name, description, imageurl, price, userId } = await req.json();

//   const line_item = {
//     quantity: 1,
//     price_data: {
//       currency: "USD",
//       product_data: {
//         name: name,
//         description: description,
//         images: [imageurl], // Assuming the image URL is provided in the request
//       },
//       unit_amount: price * 100, // Assuming the price is provided in USD
//     },
//   };

//   const session = await stripe.checkout.sessions.create({
//     line_items: [line_item],
//     mode: "payment",
//     billing_address_collection: "auto",
//     phone_number_collection: {
//       enabled: false,
//     },
//     success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/mynfts?success=1`,
//     cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/listednfts?cancelled=1`,
//     metadata: {
//       nft: nft,
//       userId: userId,
//     },
//   });

//   return NextResponse.json({ url: session.url }, { headers: corsHeader });
// }
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

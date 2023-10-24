import React from "react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/ui/hover-card";

// const Card = ({ nft }) => {
//   const ethValue = 1964.82; // Current value of ETH in USD

//   return (
//     <div className="ml-7 h-40 w-40 ">
//       <div className="group box-border rounded-xl border border-black p-4 shadow-lg transition-shadow hover:bg-opacity-50 hover:shadow-indigo-500/50">
//         <div className="relative overflow-hidden rounded-lg">
//           <img
//             src={"/NFTs/asta1.png"}
//             alt={""}
//             className="mx-auto mb-4 block h-[90px] w-full rounded-xl object-cover md:h-[200px] md:w-40"
//           />
//           <div className="absolute -bottom-8 flex h-full w-full items-center justify-center rounded-xl bg-black/20 opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100 ">
//             <Link href={`/NFTdetail/${"nft.nftid"}`}>
//               <button className="rounded-sm bg-black px-5 py-2 text-sm text-white">
//                 {" "}
//                 Quick View{" "}
//               </button>
//             </Link>
//           </div>
//         </div>
//         <h2 className="mb-2 text-xl font-bold">Demon Child Asta</h2>
//         <p className="text-gray-500">waqar</p>
//         <HoverCard>
//           {!false && true ? (
//             <div className="flex">
//               <HoverCardTrigger>
//                 <p className="mt-2 text-lg font-semibold">{23} ETH</p>
//               </HoverCardTrigger>
//             </div>
//           ) : (
//             <div className="flex">
//               <p className="mt-2 text-lg font-semibold">Sold</p>
//             </div>
//           )}
//           <HoverCardContent className="w-40">
//             <div className="flex justify-between space-x-4">
//               <div className="space-y-1">
//                 <p className="text-sm">
//                   {Math.round(ethValue * 23).toLocaleString("en-US", {
//                     style: "currency",
//                     currency: "USD",
//                   })}
//                 </p>
//                 <div className="flex items-center pt-2">
//                   <span className="text-xs text-muted-foreground">
//                     Updated on 5 July 2023
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </HoverCardContent>
//         </HoverCard>
//         {/* Additional details or actions */}
//       </div>
//     </div>
//   );
// };

// export default Card;

// Define the interface for the 'nft' prop
interface NFT {
  image: string;
  title: string;
  artist: string;
  price: number;
}

interface CardProps {
  nft: NFT;
}

const Card: React.FC<CardProps> = ({ nft }) => {
  const ethValue = 1799.0; // Current value of ETH in USD

  return (
    <div className="border-grey-400 box-border rounded-lg border  p-4 shadow-lg hover:shadow-2xl ">
      <img
        src={nft.image}
        alt={nft.title}
        className="mb-4 block h-[200px] w-48 rounded-lg object-cover"
      />
      <h2 className="mb-2 text-xl font-bold">{nft.title}</h2>
      <p className="text-gray-500">{nft.artist}</p>
      <HoverCard>
        <div className="flex">
          <HoverCardTrigger>
            <p className="mt-2 text-lg font-semibold">{nft.price} ETH</p>
          </HoverCardTrigger>
        </div>
        <HoverCardContent className="w-40">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <p className="text-sm">
                {Math.round(ethValue * nft.price).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <div className="flex items-center pt-2">
                <span className="text-xs text-muted-foreground">
                  Updated on 25 May 2023
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      {/* Additional details or actions */}
    </div>
  );
};

export default Card;

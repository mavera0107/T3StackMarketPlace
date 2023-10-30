import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  createnftschema,
  ListNFTSchema,
  BuyNFTSchema,
  getUserNftSchema,
  getNFTByIdSchema,
} from "../../../schema/nft";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { redirect } from "next/dist/server/api-utils";
import { db } from "~/server/db";

export const nftRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.nFTData.findMany({
      orderBy: {
        created_at: "asc",
      },
    });
  }),

  getNFTListing: publicProcedure.query(({ ctx }) => {
    return ctx.db.nFTData.findMany({
      where: {
        is_listed: true,
      },
      orderBy: {
        created_at: "asc",
      },
    });
  }),

  modal: publicProcedure.query(({ ctx }) => {
    return ctx.db.nFTData;
  }),

  createNFT: publicProcedure
    .input(createnftschema)
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("Input", input);
        if (
          !input.name &&
          !input.description &&
          input.ipfs_url &&
          input.owner_id
        ) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Please Add all fields",
          });
        } else {
          const payload: any = {
            owner_id: input.owner_id,
            nft_owner: input.nft_creator,
            nft_creator: input.nft_owner,
            price: input.price,
            ipfs_url: input.ipfs_url,
            name: input.name,
            description: input.description,
            token_id: input.token_id,
            is_listed: input.is_listed,
          };
          console.log(payload, "paylaod");
          const nftCreate = await ctx.db?.nFTData?.create({
            data: payload,
          });
          console.log("nft", nftCreate);
          return nftCreate;
        }
      } catch (error: any) {
        console.log("Data Error", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message,
        });
      }
    }),

  getUserNFTs: publicProcedure
    .input(getUserNftSchema)
    .query(async ({ ctx, input }) => {
      try {
        const response = await ctx.db.nFTData.findMany({
          where: {
            owner_id: input.owner_id,
          },
        });
        return response;
      } catch (error: any) {
        console.log("data error", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message,
        });
      }
    }),

  getNFTById: publicProcedure
    .input(getNFTByIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        const response = await ctx.db.nFTData.findUnique({
          where: {
            id: input.id,
          },
        });
        return { response };
      } catch (error: any) {
        console.log("data error", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message,
        });
      }
    }),

  updateNFTListing: publicProcedure
    .input(ListNFTSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        console.log(input, "input");
        // let option: any = {};
        const payload = {
          price: input.price,
          is_listed: input.is_listed,
        };

        const updateResponse = await ctx.db?.nFTData?.update({
          where: {
            token_id: input.token_id,
          },
          data: payload,
        });

        console.log(updateResponse, "updateResponse");
        return updateResponse;
      } catch (e) {
        console.log(e, "errorworking");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  updateBuyNFT: publicProcedure
    .input(BuyNFTSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        console.log(input, "input");
        let option: any = {};
        option.where = {
          token_id: input.token_id,
        };
        option.data = {
          price: "0",
          is_listed: false,
          owner_id: input.owner_id,
          nft_owner: input.wallet_address,
        };
        const updateResponse = await ctx.db?.nFTData?.update(option);
        console.log(updateResponse, "updateResponse");
        return updateResponse;
      } catch (e) {
        console.log(e, "errorworking");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});

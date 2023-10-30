import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} from "../../../schema/user";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { redirect } from "next/dist/server/api-utils";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.adminUser.findMany({
      orderBy: {
        created_at: "asc",
      },
    });
  }),

  modal: publicProcedure.query(({ ctx }) => {
    return ctx.db.adminUser;
  }),

  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("Input walletAddress payload", { input });
        console.log("wallet Address", input.wallet_address);
        if (input.wallet_address === undefined) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cannot find Wallet Address",
          });
        }
        const user: any = await ctx.db?.adminUser?.findFirst({
          where: { wallet_address: input?.wallet_address },
        });
        if (user) {
          return user;
        }
        if (!user) {
          const payload: any = {
            wallet_address: input.wallet_address,
            full_name: input.full_name,
            email_address: input.email_address,
          };
          console.log("Payload", payload);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const user: any = await ctx.db?.adminUser?.create({
            data: payload,
          });
          console.log("User Created", user);
          return { user };
        }
        console.log(user);
        return { user };
      } catch (error: any) {
        console.log("Data Error", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message,
        });
      }
    }),

  getuserdata: publicProcedure
    .input(getUserSchema)
    .query(async ({ ctx, input }) => {
      try {
        console.log("input", input);

        const user = await ctx.db?.adminUser?.findFirst({
          where: { wallet_address: input?.wallet_address },
        });
        return { user };
      } catch (error: any) {
        console.log({ error });
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),

  updateUser: publicProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("userUpdate", input);
        let option: any = {};
        option.where = {
          wallet_address: input.wallet_address,
        };
        option.data = {
          full_name: input.full_name,
        };
        const updateResponse = await ctx.db?.adminUser?.update(option);
        console.log("Update Response", updateResponse);
        return updateResponse;
      } catch (e) {
        console.log("Error", e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something Went wrong",
        });
      }
    }),
});

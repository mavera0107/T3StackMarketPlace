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

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.adminUser.findMany({
      orderBy: {
        created_at: "asc",
      },
    });
  }),

  me: publicProcedure.query(({ ctx }) => {
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
            balance: input.balance,
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
          // return ctx.db.adminUser.create({
          //   data: {
          //     wallet_address: input.wallet_address,
          //   },
          // });
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

  get: publicProcedure.input(getUserSchema).query(async ({ ctx, input }) => {
    try {
      console.log("input", input);

      const user = await ctx.db.adminUser.findFirst({
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
});

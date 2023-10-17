import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getUserSchema, createUserSchema } from "../../../schema/user";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
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

  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.adminUser.create({
        data: {
          wallet_address: input.wallet_address,
        },
      });
    }),
});

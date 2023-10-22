import z from "zod";

export const createUserSchema = z.object({
  wallet_address: z.string(),
  balance: z.number(),
  full_name: z.string(),
  email_address: z.string(),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

export const updateUserSchema = z.object({
  wallet_address: z.string(),
  full_name: z.string(),
});

export const getUserSchema = z.object({
  wallet_address: z.string(),
});

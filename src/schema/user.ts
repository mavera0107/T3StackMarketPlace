import z from "zod";

export const createUserSchema = z.object({
  wallet_address: z.string(),
  balance: z.string(),
  full_name: z.string(),
  email_address: z.string(),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

export const updateUserSchema = z.object({
  email_address: z.string().email(),
  full_name: z.string(),
});

export const loginUserSchema = z.object({
  wallet_address: z.string(),
});

export type loginUserInput = z.TypeOf<typeof loginUserSchema>;

export const getUserSchema = z.object({
  wallet_address: z.string(),
});

import z from "zod";

export const createnftschema = z.object({
  owner_id: z.string(),
  nft_owner: z.string(),
  nft_creator: z.string(),
  price: z.string(),
  ipfs_url: z.string(),
  name: z.string(),
  description: z.string(),
  token_id: z.string(),
  is_listed: z.boolean(),
});

export type CreateNFTInput = z.TypeOf<typeof createnftschema>;

export const ListNFTSchema = z.object({
  token_id: z.string(),
  price: z.string(),
  is_listed: z.boolean(),
});

export const BuyNFTSchema = z.object({
  token_id: z.string(),
  owner_id: z.string(),
  wallet_address: z.string().optional(),
});

export const getNftSchema = z.object({});

export const getUserNftSchema = z.object({
  owner_id: z.string(),
});

export const getNFTByIdSchema = z.object({
  id: z.string(),
});

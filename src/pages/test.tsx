import React from "react";
import { api } from "~/utils/api";
import { CreateUserInput, createUserSchema } from "~/schema/user";
const test = () => {
  // const create = api.user.create.useMutation(createUserSchema){
  // c
  // };
  const { data: user } = api.user.get.useQuery({
    wallet_address: "0x94544c10940a8e30fd0951bd81afa17322ca2ed4",
  });
  return <div>test{user?.toString()}</div>;
};

export default test;

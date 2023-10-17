import React from "react";
import { api } from "~/utils/api";
import { CreateUserInput, createUserSchema } from "~/schema/user";
import { Button } from "~/components/ui/ui/button";
import { Loader2 } from "lucide-react";
const test = () => {
  // const create = api.user.create.useMutation(createUserSchema){
  // c
  // };
  // const { data: user } = api.user.get.useQuery({
  //   wallet_address: "0x94544c10940a8e30fd0951bd81afa17322ca2ed4",
  // });

  return (
    <div>
      test
      <Button className="rounded " variant="outline">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loging In
      </Button>
      <Button className=" rounded" variant="outline">
        Log In
      </Button>
    </div>
  );
};

export default test;

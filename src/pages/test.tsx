import React, { Fragment, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { CreateUserInput, createUserSchema } from "~/schema/user";
import { Button } from "~/components/ui/ui/button";
import { Loader2 } from "lucide-react";
import Card from "~/components/card/nftcard";
const test = () => {
  const [address, setAddress] = useState("");
  // const create = api.user.create.useMutation(createUserSchema){
  // c
  // };
  // const { data: user } = api.user.get.useQuery({
  //   wallet_address: "0x94544c10940a8e30fd0951bd81afa17322ca2ed4",
  // });
  function getUser() {
    const user = localStorage.getItem("user");
    if (user) {
      const data = JSON.parse(user);
      let wallet_address = data.wallet_address;
      setAddress(wallet_address);
      return wallet_address;
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Fragment>
      Hello
      <Card />
    </Fragment>
  );
};

export default test;

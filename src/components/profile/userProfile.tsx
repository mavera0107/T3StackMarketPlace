import React, { useEffect, useState } from "react";

export default function userProfile() {
  const [Address, setAddress] = useState();
  function getuserAddress() {
    let address = localStorage.getItem("user") as any;
    if (address) {
      setAddress(address);
    }
  }
  useEffect(() => {
    getuserAddress();
  });
  return <div>{Address}</div>;
}

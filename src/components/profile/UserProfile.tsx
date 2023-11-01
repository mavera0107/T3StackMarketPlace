"use client";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/ui/card";
import { Button } from "../ui/ui/button";
import { Pen, UserIcon, Mail, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/ui/sheet";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

export default function userProfile() {
  const { AccountAddress } = useSelector(
    (state: RootState) => state.AccountAddress as any,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const updateUser = api.user.updateUser.useMutation({
    onSuccess: (res: any) => {
      console.log(res, "Login result");
      if (res) {
        console.log("updated");
      }
      setIsLoading(false);
    },
    onError: (err: any) => {
      toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setError(true);
      setIsLoading(false);
      console.log(err.message, "NFT Creation Error");
    },
  });

  const { data, refetch } = api.user.getuserdata.useQuery(
    {
      wallet_address: AccountAddress,
    },
    {
      refetchOnWindowFocus: true,
    },
  );

  const [getUserDetails, setUserDetails] = useState({
    Name: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserDetails({
      ...getUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  async function UpdateData() {
    setIsLoading(true);
    console.log("UserDetails", getUserDetails);

    const payload = {
      wallet_address: AccountAddress,
      full_name: getUserDetails.Name,
    };

    let response = await updateUser.mutateAsync(payload);
    if (response) {
      setIsLoading(false);
      refetch();
    }
    console.log("Response", response);
  }


  return (
    <Fragment>
      <div className="flex flex-col items-center justify-start p-5">
        <Avatar className="m-6 h-full w-40">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              User Profile
            </CardTitle>
            <CardDescription className="flex items-center justify-center">
              User Information
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <UserIcon />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">User Name</p>
                <p className="text-sm text-muted-foreground">
                  {data?.user?.full_name || "Loading"}
                </p>
              </div>
            </div>
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <Mail />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Email Address
                </p>
                <p className="text-sm text-muted-foreground">
                  {" "}
                  {data?.user?.email_address || "Loading"}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-gray-300 hover:bg-green-400"
                >
                  {" "}
                  <Pen className="mr-2 h-4 w-4" />
                  Update data
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white">
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you're
                    done. <br></br>You Can Also Change one Field Just Fill One
                    and leave other one Empty.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                      <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
                        Update Name
                      </label>
                    </div>

                    <div className="md:w-2/3">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={getUserDetails.Name}
                        name="Name"
                        placeholder="insert Name Here"
                        className="mr-2 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="rounded-xl bg-gray-200 hover:bg-green-300"
                      onClick={UpdateData}
                    >
                      Save Name
                    </Button>
                  )}
                </div>
                {isError ? (
                  <p className="text-red-400">Error occured</p>
                ) : (
                  <></>
                )}
              </SheetContent>
            </Sheet>
          </CardFooter>
        </Card>
      </div>
    </Fragment>
  );
}

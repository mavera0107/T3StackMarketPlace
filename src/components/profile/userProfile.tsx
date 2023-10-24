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
import { Pen, UserIcon, Mail } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/ui/sheet";

export default function userProfile() {
  const [getUserDetails, setUserDetails] = useState({
    Name: "",
    Email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserDetails({
      ...getUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  function UpdateData() {
    console.log("UserDetails", getUserDetails);
  }
  // const [Address, setAddress] = useState();
  // function getuserAddress() {
  //   let address = localStorage.getItem("user") as any;
  //   if (address) {
  //     setAddress(address);
  //   }
  // }
  // useEffect(() => {
  //   getuserAddress();
  // });
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
                <p className="text-sm text-muted-foreground">Muhammad Waqar</p>
              </div>
            </div>
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <Mail />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Email Address
                </p>
                <p className="text-sm text-muted-foreground">
                  muhammadwaqar@gmail.com
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
                  <Button
                    type="submit"
                    className="rounded-xl bg-gray-200 hover:bg-green-300"
                    onClick={UpdateData}
                  >
                    Save Name
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </CardFooter>
        </Card>
      </div>
    </Fragment>
  );
}

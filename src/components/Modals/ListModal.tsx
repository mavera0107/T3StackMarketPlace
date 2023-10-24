import React, { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/utils/api";
import { Debug } from "~/utils/contants";
import { Button } from "../ui/ui/button";
interface nftData {
  tokenId: string; // Change the type of projectID to match your data type
}
export const ListModal: React.FC<nftData> = ({ tokenId }) => {
  const [showModal, setShowModal] = useState(false);
  const [showprice, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const ListNFT = api.nft.updateNFTListing.useMutation({
    onSuccess: (res: any) => {
      console.log(res, "Login result");
      if (res) {
        toast("NFT Listing Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value) {
      setPrice(e.target.value);
      Debug && console.log(showprice);
    }
  };

  async function handleList() {
    let value: any = {
      token_id: tokenId,
      price: showprice,
      is_listed: true,
    };

    let response = await ListNFT.mutateAsync(value);
    console.log("Response", response);

    // if (response) {
    //   toast.success("Listed Successfully!", {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
  }

  return (
    <>
      <Button
        className="linear rounded-[20px] bg-gray-300 px-4 py-2 text-base font-medium text-black transition duration-200 hover:bg-green-200 active:bg-yellow-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        List NFT{" "}
      </Button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-sm">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold">List NFT</h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex flex-auto flex-col items-center justify-center p-6">
                  <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                      <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
                        Price In USD
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        onChange={handleChange}
                        name="Description"
                        className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                        type="text"
                        placeholder="price"
                        required
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <Button
                    className="linear hover:bg-grey-200 rounded-[20px] bg-red-400 px-4 py-2 text-base font-medium text-black transition duration-200"
                    type="button"
                    // disabled={isLoading}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="linear ml-5 rounded-[20px] bg-green-300 px-4 py-2 text-base font-medium text-black transition duration-200 hover:bg-green-200 active:bg-yellow-200"
                    type="button"
                    onClick={() => handleList()}
                    disabled={isLoading}
                  >
                    {isLoading ? "Please Wait" : "List NFT"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {isError ? (
            <div>
              <p className="bg-red-500">
                Error occurred : Sorry For Inconvenience!
              </p>
              <Button
                className="bg-red-400"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : null}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnFocusLoss
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

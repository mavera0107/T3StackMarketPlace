import React, { ChangeEvent, useState, useEffect } from "react";
// import { isAddress } from "viem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ERC721ABI, NFT_CONTRACT_ADDRES } from "../constants";
import { ethers } from "ethers";
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from "@biconomy/paymaster";
import { useAppSelector } from "~/redux/store";
interface nftData {
  tokenId: string; // Change the type of projectID to match your data type
}
export const Modal: React.FC<nftData> = ({ tokenId }) => {
  const smartAccount = useAppSelector(
    (state) => state.smartAccountSlice.smartAccount,
  );

  const [showModal, setShowModal] = useState(false);
  const [showaddress, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);

  // const handletransfer = async () => {
  //   setStatus(true);
  //   console.log("smart Account in add nft: ", smartAccount);
  //   const readProvider = smartAccount.provider;
  //   const contract = new ethers.Contract(
  //     NFT_CONTRACT_ADDRESS,
  //     ERC721ABI,
  //     readProvider,
  //   );
  //   try {
  //     const populatedTxn = await contract.populateTransaction.transferFrom(
  //       address,
  //       showaddress,
  //       tokenId,
  //     );

  //     const calldata = populatedTxn.data;
  //     const tx1 = {
  //       to: NFT_CONTRACT_ADDRESS,
  //       data: calldata,
  //     };

  //     console.log("here before userop");
  //     let userOp = await smartAccount.buildUserOp([tx1]);
  //     console.log("userop", { userOp });
  //     const biconomyPaymaster =
  //       smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
  //     console.log(biconomyPaymaster);
  //     console.log(smartAccount);
  //     let paymasterServiceData: SponsorUserOperationDto = {
  //       mode: PaymasterMode.SPONSORED,
  //     };
  //     console.log("Hello");
  //     const paymasterAndDataResponse =
  //       await biconomyPaymaster.getPaymasterAndData(
  //         userOp,
  //         paymasterServiceData,
  //       );
  //     console.log("Hello2");

  //     userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
  //     console.log("Hello3");
  //     const userOpResponse = await smartAccount.sendUserOp(userOp);
  //     console.log("Hello4");
  //     console.log("userOpHash", userOpResponse);
  //     const { receipt } = await userOpResponse.wait(1);
  //     console.log("txHash", receipt.transactionHash);
  //     if (userOpResponse) {
  //       setStatus(false);
  //       setTimeout(() => {
  //         setShowModal(false);
  //       }, 1500);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     console.log(err);
  //     setStatus(false);
  //   }
  // };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   let value = e.target.value;
  //   if (isAddress(value)) {
  //     setAddress(e.target.value);
  //     console.log(showaddress);
  //     setError(false);
  //   } else {
  //     setError(true);
  //   }
  // };

  return (
    <>
      <button
        className="linear rounded-[20px] bg-gray-300 px-4 py-2 text-base font-medium text-black transition duration-200 hover:bg-green-200 active:bg-yellow-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Transfer NFT
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-sm">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold">NFT transfer</h3>
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
                        Recepient Address
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        // onChange={handleChange}
                        name="Description"
                        className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                        type="text"
                        placeholder="Address"
                        required
                      />
                    </div>
                  </div>
                  {error ? (
                    <p className="text-red-400">Not an EVM address</p>
                  ) : (
                    <></>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="linear hover:bg-grey-200 rounded-[20px] bg-red-400 px-4 py-2 text-base font-medium text-black transition duration-200"
                    type="button"
                    disabled={status}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="linear ml-5 rounded-[20px] bg-green-300 px-4 py-2 text-base font-medium text-black transition duration-200 hover:bg-green-200 active:bg-yellow-200"
                    type="button"
                    // onClick={() => handletransfer()}
                    disabled={status}
                  >
                    {status ? "Please Wait" : "Confirm Transfer"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
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

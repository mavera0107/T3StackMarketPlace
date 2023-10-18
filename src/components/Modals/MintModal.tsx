import React, { ChangeEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ImageUploader from "../utils/ImageUploader";
// import metaData from "../utils/Metadata";
import { Debug } from "../contants";
// import { useNFTFunctionwriter } from "../utils/hook";
import Link from "next/link";
interface MintModalProps {
  selectedImage: File | null | undefined;
  getNftDetails: {
    NftName: string;
    Description: string;
  };
  isFormValid: boolean;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<File | null | undefined>
  >;
  setNftDetails: React.Dispatch<
    React.SetStateAction<{ NftName: string; Description: string }>
  >;
}

export const MintModal: React.FC<MintModalProps> = ({
  getNftDetails,
  selectedImage,
  isFormValid,
  setNftDetails,
  setSelectedImage,
}: MintModalProps) => {
  // Access the title prop and use it in your component
  const [transactionerror, setTransactionerror] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [MetadataStatus, setMetadataStatus] = useState(false);
  const [ImageStatus, setImageStatus] = useState(false);
  const [Mintstatus, setMintstatus] = useState(false);
  const [tokenUri, setTokenUri] = useState<string>("");

  async function mintNft() {
    Debug && console.log("called");
    try {
      // const tx = await writeAsync?.();
      // Debug && console.log("Transaction", tx?.hash);
    } catch (error: any) {
      Debug && console.log("Error >>>", error.message);
      setTransactionerror("User Rejected The Request");
      setMintstatus(false);
    }
  }

  // const handleUpload = async () => {
  //   Debug && console.log(selectedImage, getNftDetails);
  //   const uploadImages = await ImageUploader(
  //     selectedImage,
  //     getNftDetails.NftName,
  //   );
  //   Debug && console.log(uploadImages?.status);
  //   if (uploadImages?.status === 200) {
  //     setImageStatus(true);
  //   }
  //   const metadatares = await metaData(
  //     getNftDetails.NftName,
  //     getNftDetails.Description,
  //     uploadImages?.IpfshashImage,
  //   );
  //   Debug && console.log(metadatares?.status);
  //   if (metadatares?.status === 200) {
  //     setMetadataStatus(true);
  //   }
  //   let TokenUri = `https://ipfs.io/ipfs/${metadatares?.IpfsHash}`;
  //   setTokenUri(TokenUri);
  // };

  function cancelAll() {
    setShowModal(false);
    setTokenUri("");
    setMintstatus(false);
    setMetadataStatus(false);
    setImageStatus(false);
    setSelectedImage(null);
    setNftDetails({ NftName: "", Description: "" });
  }
  // useEffect(() => {
  //   // if (isSuccess) {
  //   //   setMintstatus(true);
  //   //   isSuccess = false;
  //   //   Debug && console.log(data, "Data");
  //     // Set a timeout to close the modal after 5 seconds
  //     const modalTimeout = setTimeout(() => {
  //       setShowModal(false);
  //       setTokenUri("");
  //       setMintstatus(false);
  //       setMetadataStatus(false);
  //       setImageStatus(false);
  //       setSelectedImage(null);
  //       setNftDetails({ NftName: "", Description: "" });
  //     }, 3000);
  //     Debug && console.log(getNftDetails);
  //   }
  // }, [isSuccess]);

  useEffect(() => {
    if (tokenUri !== "" && Mintstatus === false) {
      // Call mintNft when tokenUri is not empty and mint status is false
      mintNft();
    }
  }, [tokenUri, Mintstatus]);

  return (
    <React.Fragment>
      {
        <button
          disabled={!isFormValid || showModal}
          className="rounded-lg bg-purple-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-slate-200"
          type="button"
          onClick={() => {
            setShowModal(true);
            // handleUpload();
          }}
        >
          Mint NFT
        </button>
      }
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div>
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white p-10 shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold">Minting Process</h3>
                </div>
                {/*body*/}
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-center">
                    {ImageStatus ? (
                      <>
                        {" "}
                        <div className="flex flex-row items-center justify-center">
                          <img src="svgtick.svg" className="h-8" />
                          <p className="focus:outline-nonefont-medium  mr-2 inline-flex items-center rounded px-5 py-2.5 text-center text-sm text-green-400 hover:cursor-default dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Success
                          </p>
                        </div>
                        <div>Uploading Image to Ipfs Done!.</div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-row items-center justify-center">
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="mr-3 inline h-4 w-4 animate-spin text-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            ></path>
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <p className="focus:outline-nonefont-medium  mr-2 inline-flex items-center rounded px-5 py-2.5 text-center text-sm text-black hover:cursor-default dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Loading...
                          </p>
                        </div>
                        <div>Uploading Image to Ipfs</div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    {MetadataStatus ? (
                      <>
                        {" "}
                        <div className="flex flex-row items-center justify-center">
                          <img src="svgtick.svg" className="h-8" />
                          <p className="focus:outline-nonefont-medium  mr-2 inline-flex items-center rounded px-5 py-2.5 text-center text-sm text-green-400 hover:cursor-default dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Success
                          </p>
                        </div>
                        <div>Uploading MetaData to Ipfs Done!.</div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-row items-center justify-center">
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="mr-3 inline h-4 w-4 animate-spin text-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            ></path>
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <p className="focus:outline-nonefont-medium  mr-2 inline-flex items-center rounded px-5 py-2.5 text-center text-sm text-black hover:cursor-default dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Loading...
                          </p>
                        </div>
                        <div>Uploading MetaData to Ipfs</div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-row items-center justify-center">
                    {true ? (
                      <>
                        <div className="flex flex-row items-center justify-center">
                          <img src="cancel.svg" className="h-8" />
                          <p className="focus:outline-nonefont-medium  mr-2 inline-flex items-center rounded px-5 py-2.5 text-center text-sm text-red-400 hover:cursor-default dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Erro on Transaction
                          </p>
                        </div>
                        <div>{transactionerror}</div>
                      </>
                    ) : Mintstatus ? (
                      <>
                        {" "}
                        <div className="flex flex-row items-center justify-center">
                          <img src="svgtick.svg" className="h-8" />
                          <p className="focus:outline-nonefont-medium  mr-2 inline-flex items-center rounded px-5 py-2.5 text-center text-sm text-green-400 hover:cursor-default dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Success
                          </p>
                        </div>
                        <div>Transaction Confirm Check Your NFT!.</div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-row items-center justify-center">
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="mr-3 inline h-4 w-4 animate-spin text-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            ></path>
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <p className="focus:outline-nonefont-medium  mr-2 inline-flex items-center rounded px-5 py-2.5 text-center text-sm text-black hover:cursor-default dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Loading...
                          </p>
                        </div>
                        <div>See metamask For Transaction.</div>
                      </>
                    )}
                  </div>

                  {Mintstatus && MetadataStatus && ImageStatus && (
                    <div className="flex items-center justify-center">
                      <Link href="/MyNfts" className="text-blue-300 underline">
                        Go to My NFT
                      </Link>
                    </div>
                  )}
                  {true && (
                    <div className="flex items-center justify-center">
                      <button
                        className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-200 disabled:bg-slate-200"
                        onClick={cancelAll}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </React.Fragment>
  );
};

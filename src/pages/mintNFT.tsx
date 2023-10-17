import { useState, ChangeEvent, useRef, useEffect } from "react";
// import "../utils/uploader.css";
import "react-toastify/dist/ReactToastify.css";
import { MintModal } from "../components/Modals/MintModal";

function Uploader() {
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  //showing user Selected Image
  const [selectedImage, setSelectedImage] = useState<File | null>(); // To store the selected image URL
  //storing input data
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  //IMAGE nft name
  const [getNftDetails, setNftDetails] = useState({
    NftName: "",
    Description: "",
  });

  // // Function to handle removing the selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setIsImageSelected(false);
  };
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files && e.target.files[0];

    if (file) {
      // Set the selected image to the file object
      setSelectedImage(file);
      setIsImageSelected(true);
    } else {
      setSelectedImage(null);
      setIsImageSelected(false);
      // Clear the selected image if it's not a valid PNG file
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNftDetails({
      ...getNftDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Check if both fields are filled
    setIsFormValid(
      getNftDetails.NftName.trim() !== "" &&
        getNftDetails.Description.trim() !== "" &&
        isImageSelected,
    );
  }, [getNftDetails, isImageSelected]);

  return (
    <main className="mt-16 flex flex-col items-center justify-center">
      {
        <div className="mb-6 rounded-t bg-red-500 px-4 py-2 font-bold text-white">
          Please connect to your account to select a photo.
        </div>
      }
      <form onClick={() => fileInputRef.current?.click()}>
        <div className="image-container">
          {selectedImage && (
            <div className="flex flex-col items-center justify-center ">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="selected-image"
                style={{ maxWidth: "500px", maxHeight: "250px" }} // Adjust the size as needed
              />
              <button
                className="rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={handleRemoveImage}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        {!selectedImage && (
          <div className="flex flex-col justify-center font-extrabold">
            <input
              type="file"
              className="input-field"
              hidden
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            <button>Browse Files To Upload</button>
            <p>Upload Only PNG files</p>
          </div>
        )}
      </form>
      <br></br>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
            NFT Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            onChange={handleChange}
            value={getNftDetails.NftName}
            name="NftName"
            placeholder="insert NFT name"
            className="mr-2 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
            required
          />
        </div>
      </div>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
            NFT Description
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            onChange={handleChange}
            value={getNftDetails.Description}
            name="Description"
            className="bisErrororder-gray-200 w-full appearance-none rounded border-2 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
            type="text"
            placeholder="Description"
            required
          />
        </div>
      </div>
      <MintModal
        setNftDetails={setNftDetails}
        setSelectedImage={setSelectedImage}
        isFormValid={isFormValid}
        getNftDetails={getNftDetails}
        selectedImage={selectedImage}
      />
    </main>
  );
}

export default Uploader;

import React from "react";

const LoadingModal = (props: any) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="max-h-[300px] w-[300px] max-w-xl overflow-y-auto bg-white sm:rounded-2xl">
        <div className="w-full">
          <div className="m-8 mx-auto my-20 flex max-w-[400px] flex-col items-center justify-center">
            <img
              src={"./Loader.gif"}
              alt="image"
              className="h-[80px] w-[80px] bg-red-500"
            ></img>
            <h2 className="font-bold">{props.h2}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;

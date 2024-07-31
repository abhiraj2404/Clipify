import React from "react";

function Home() {
  return (
    <div className="">
      {" "}
      <div className="flex flex-col gap-5 justify-center items-center h-[85vh] text-center">
        <h1 className="text-5xl font-bold ">Welcome to clipify</h1>
        <p className="text-3xl">
          An online clipboard for all your messages and passwords
        </p>
      </div>
    </div>
  );
}

export default Home;

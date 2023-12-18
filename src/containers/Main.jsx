import React from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MainBar from "../components/MainBar";

const Main = () => {
  return (
    <div className="flex flex-col h-screen">
        <div className="z-10">
            <Navbar />
        </div>
      
        <div className="flex-1 flex justify-center items-center">
            <div className="fixed top-32 flex flex-col items-center">
                <div className="mb-2">
                    <SearchBar/>
                </div>
                <div>
                    <MainBar />    
                </div>
            </div>
        </div>
    </div>
  );
};

export default Main;

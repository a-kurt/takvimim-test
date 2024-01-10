import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MainBar from "../components/MainBar";
import SearchResultsList from "../components/SearchResultsList";

const Main = () => {
    const [results, setResults] = useState([]);

  return (
    <div className="flex flex-col h-screen">
        <div className="z-10 xl:z-0">
            <Navbar />
        </div>
        <div className="flex-1 flex justify-center items-center">
            <div className="fixed top-22 flex flex-col items-center">
                <div className="mb-2">
                    <SearchBar setResults={setResults}/>
                    <SearchResultsList results={results} />
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

import React from 'react'
import SearchResult from './SearchResult';

const SearchResultsList = ({ results }) => {
  return (
    <div className='absolute w-full bg-white flex flex-col shadow-sm text-sm text-[#252B42] border border-gray-300 rounded-sm focus:outline-none max-h-72 overflow-y-scroll'>
        {
            results.map((result, id) => {
                return <SearchResult id={id} result={result} />
            })
        }
    </div>
  )
}

export default SearchResultsList
'use client'
// pages/index.tsx

import { useState } from 'react';
import LocationList from './components/locationlist';
import useLocations from './hooks/useLocation';
import { FaSearch } from 'react-icons/fa';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; 

const Home = () => {
  const { locations, pageInfo, fetchNextPage, fetchPreviousPage,loading,fetchPage,handleSearch } = useLocations();
  const [searchTerm, setSearchTerm] = useState('');

  if(!pageInfo)return <p>loading</p>

  const handleSearchButtonClick =()=>{
  handleSearch(searchTerm)
  }

  

  return (
    <div className="container mx-auto p-8 text-slate-800 ">
     <div className="flex items-center justify-between mb-4">
      {/* Left side - Title */}
      <div className="mr-2">
        <h2 className="text-lg font-semibold">Browse Locations</h2>
      </div>

      {/* Right side - Search input */}
      <div className="flex items-center text-black">
        <input
          type="text"
          placeholder="Search by location name"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="rounded-l-md p-2 focus:outline-none border border-black"
        />
        <button
          onClick={handleSearchButtonClick}
          className="bg-transparent border border-black text-white p-2 rounded-r-md focus:outline-none"
        >
          <FaSearch size={24} color='black' />
        </button>
      </div>
    </div>

      <LocationList locations={locations} loading={loading} />

      
      {!loading && (
  <div className="mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
    <button
      onClick={fetchPreviousPage}
      disabled={!pageInfo || !pageInfo.prev}
      className="flex items-center justify-center mb-2 sm:mb-0"
    >
      <FaArrowLeft className="mr-1" />
      Previous
    </button>

    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: pageInfo.pages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => fetchPage(index + 1)}
          className={`flex items-center justify-center rounded-full border border-black p-2 w-8 ${index + 1 === pageInfo.currentPage ? 'bg-gray-200' : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>

    <button
      onClick={fetchNextPage}
      disabled={!pageInfo || !pageInfo.next}
      className="flex items-center justify-center mt-2 sm:mt-0"
    >
      Next
      <FaArrowRight className="ml-1" />
    </button>
  </div>
)}
    </div>
  );
};

export default Home;

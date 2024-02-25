// components/LocationDetails.tsx
"use client";
// components/LocationDetails.tsx
import React, { useState, useEffect } from "react";
import { Location, Residents } from "@/app/tpyes";
import { useRouter } from "next/navigation";
import { updateResidents } from "@/store/actions";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import {  FaArrowLeft } from "react-icons/fa";
import Image from "next/image";


interface LocationDetailsProps {
  location: Location;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ location }) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const [residents, setResidents] = useState<Residents[]>([]);
  const [filteredResidents, setFilteredResidents] = useState<Residents[]>(residents);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const residentsPerPage = 20;
  const filter = (residents:Residents[])=>{
    const filteredresidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredResidents(filteredresidents);
  }

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const startIdx = (currentPage - 1) * residentsPerPage;
        const endIdx = startIdx + residentsPerPage;
  
        const residentPromises = location.residents
          .slice(startIdx, endIdx)
          .map(async (residentUrl: string) => {
            const response = await fetch(residentUrl);
            return response.json();
          });
  
        const residentData = await Promise.all(residentPromises);
        setResidents(residentData);
        dispatch(updateResidents(residentData));
  
        // if (residentData.length) {
        //   filter(residentData);
        // }
      } catch (error) {
        console.error("Error fetching residents:", error);
      }
    };
  
    // Only fetch residents if there are residents URLs
    if (location.residents.length > 0) {
      fetchResidents();
    }
  }, [location.residents, currentPage, searchTerm, dispatch]);
  

  const totalPages = Math.ceil(location.residents.length / residentsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleClick = (redidentId: number) => {
    route.push(`/residents/${redidentId}`);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch=(search:string)=>{

  }

  
  return (
    <div className="container mx-auto p-8">
           <span onClick={() => route.push('/')} className="sm:flex items-center hover:cursor-pointer "><FaArrowLeft size={24} color="black" /><p className="p-2">Back Home</p></span> 
          
        <div className="mb-4 sm:flex items-center justify-between ">
        <div className="mr-2">
      <h1 className="text-3xl font-semibold mb-4">{location.name}</h1>
      <p className="text-sm font-medium">Type: {location.type}</p>
      <p className="text-sm font-medium">Dimension: {location.dimension}</p>
      <p className="text-sm font-medium">
        Number of Residents: {location.residents.length}
      </p>
      </div>
      <div className="flex items-center text-black">
          <input
            type="text"
            placeholder="Search by resident name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="rounded-l-md p-2 focus:outline-none border border-black"
          />
          <button
            onClick={() => handleSearch(searchTerm)}
            className="bg-transparent border border-black text-white p-2 rounded-r-md focus:outline-none"
          >
            <FaSearch size={24} color="black" />
          </button>
        </div>
        </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Residents:</h2>
      {residents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {residents.map((resident) => (
            <div
              key={resident.id}
              className="bg-white p-4 rounded-md shadow-md card hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out"
              onClick={() => handleClick(resident.id)}
            >
              <Image
                src={resident.image}
                alt={resident.name}
                width={500}
                height={500}
                className="w-full h-48 object-cover mb-4 rounded-md"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold mb-2">{resident.name}</h3>
              <p
                className={`text-sm font-medium  ${
                  resident.status.toLowerCase() === "alive"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                Status: {resident.status}
              </p>
              <p className="text-sm font-medium">Species: {resident.species}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex justify-center text-current text-lg font-bold">
          Sorry, No residents found 😔
        </p>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 p-2 rounded-full border ${
                index + 1 === currentPage ? "bg-gray-200" : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationDetails;

"use client";
import React, { useState, useEffect } from "react";
import { Location, Residents } from "@/app/tpyes";
import { useRouter } from "next/navigation";
import { updateResidents } from "@/store/actions";
import { useDispatch } from "react-redux";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { ResidentsGrid } from "./residentGrid";


interface LocationDetailsProps {
  location: Location;
}



const LocationDetails: React.FC<LocationDetailsProps> = ({ location }) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const residentsPerPage = 20;

  const [residents, setResidents] = useState<Residents[]>([]);
  const [filteredResidents, setFilteredResidents] = useState<Residents[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(location.residents.length / residentsPerPage));
  const [loading, setLoading] = useState(false);
  

  const filterResidents = (search: string) => {
    const filteredResidents = residents.filter((resident) =>
      resident.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredResidents(filteredResidents);

    const totalPages = Math.ceil(
      (searchTerm.length > 0 ? filteredResidents.length : location.residents.length) / residentsPerPage
    );
    setTotalPages(totalPages);
  };

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        setLoading(true);

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

        setLoading(false);
        
        if(searchTerm.length){
          filterResidents(searchTerm);
          setCurrentPage(1);
          }

        
      } catch (error) {
        console.error("Error fetching residents:", error);
        setLoading(false);
      }
    };
    if (location.residents.length > 0) {
      fetchResidents();
    }
  }, [location.residents, currentPage, dispatch,searchTerm]);

  

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleClick = (residentId: number) => {
    route.push(`/residents/${residentId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if(searchTerm.length){
    filterResidents(searchTerm);
    setCurrentPage(1);
    }
    
  };

  return (
    <div className="container mx-auto p-8">
      <span
        onClick={() => route.push("/")}
        className="sm:flex items-center hover:cursor-pointer "
      >
        <FaArrowLeft size={24} color="black" />
        <p className="p-2">Back Home</p>
      </span>

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
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="rounded-l-md p-2 focus:outline-none border border-black"
          />
          <button
            onClick={handleSearch}
            className="bg-transparent border border-black text-white p-2 rounded-r-md focus:outline-none"
          >
            <FaSearch size={24} color="black" />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Residents:</h2>
      {loading ? (
        <p className="flex justify-center text-current text-lg font-bold">
          Loading...
        </p>
      ) : searchTerm.length > 0 && filteredResidents.length === 0 ? (
        <p className="flex justify-center text-current text-lg font-bold">
          No matching residents found 😔
        </p>
      ) : residents.length > 0 || filteredResidents.length > 0 ? (
        <ResidentsGrid
          residents={searchTerm.length > 0 ? filteredResidents : residents}
          handleClick={handleClick}
        />
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

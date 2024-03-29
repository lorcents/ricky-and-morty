"use client";
import React, { useState, useEffect } from "react";
import { Location } from "../app/tpyes";
import Link from "next/link";

interface LocationTableProps {
  locations: Location[];
  loading: boolean;
}

const LocationTable: React.FC<LocationTableProps> = ({
  locations,
  loading,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const handleRowClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handlePopupClose = () => {
    setSelectedLocation(null);
  };

  useEffect(() => {}, [loading]);

  if(!loading && !locations){
    return <p className="flex justify-center text-current text-lg font-bold">
    Sorry, No Loction found 😔
  </p>
  }

  const visibleLocations = loading ? locations.slice(0, 20) : locations;

  return (
    <div className="relative overflow-x-auto">
      <table
        className={`min-w-full bg-white border ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 pl-2 text-start border-r">Name</th>
            <th className="py-2 pl-2 text-start">Type</th>
            <th className="py-2 pl-2 text-start border-l">Dimension</th>
            <th className="py-2 pl-2 text-start border-l">Residents</th>
          </tr>
        </thead>
        <tbody>
          {loading // Show skeleton rows when loading
            ? Array.from({ length: 20 }).map((_, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-slate-50" : "bg-white"
                  } animate-pulse h-10`}
                >
                  <td className="py-2 pl-0 "></td>
                  <td className="py-2 pl-0"></td>
                  <td className="py-2 pl-0"></td>
                </tr>
              ))
            : visibleLocations.map((location, index) => (
                <tr
                  key={location.id}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 pl-2 underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                    <Link key={location.id} href={`/location/${location.id}`}>
                      {location.name}
                    </Link>
                  </td>
                  <td className="py-2 pl-2">{location.type}</td>
                  <td className="py-2 pl-2">{location.dimension}</td>
                  <td className="py-2 pl-2">{location.residents.length}</td>
                </tr>
              ))}
        </tbody>
      </table>

      {selectedLocation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">{selectedLocation.name}</h2>
            <p>Type: {selectedLocation.type}</p>
            <p>Dimension: {selectedLocation.dimension}</p>
            <button
              onClick={handlePopupClose}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationTable;

"use client";
// pages/index.tsx
import { useState, useEffect } from "react";
import LocationList from "../components/locationlist";
import useLocations from "../hooks/useLocation";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "@/components/modal";
import { CustomModalContent } from "@/components/customModal";

const Home = () => {
  const {
    locations,
    pageInfo,
    fetchNextPage,
    fetchPreviousPage,
    loading,
    fetchPage,
    handleLocationSearch,
    characters,
    handleCharacterSearch,
    episodes,
    handleEpisodeSearch,
    searchLoading,
  } = useLocations();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("location");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Update filteredLocation whenever locations or searchTerm changes
  }, [locations, searchTerm]);

  if (!pageInfo) return <p>Loading...</p>;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (searchType === "location") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (searchType === "location") {
      handleLocationSearch(searchTerm);
    } else if (searchType === "character") {
      const chars = await handleCharacterSearch(searchTerm);
      characters && setShowModal(true);
    } else if (searchType === "episode") {
      const eps = await handleEpisodeSearch(searchTerm);
      if (!episodes && !searchLoading) {
        toast.error("No episode found");
        return;
      }
      episodes && setShowModal(true);
    } else {
      toast.error("Invalid search term");
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-8 text-slate-800 ">
      <div className="mb-4 sm:flex items-center justify-around ">
        <span className="sm:flex items-center ">
          <FaHome size={24} color="black" />
          <p className="p-2">Home</p>
        </span>
        {/* Left side - Title */}
        <div className="mr-2">
          <h2 className="text-lg font-semibold">Browse Locations</h2>
        </div>
        {/* Right side - Search input */}
        <div className="flex items-center text-black h-11">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="p-2 focus:outline-none border border-black rounded-l-md h-full"
          >
            <option value="location">Location</option>
            <option value="character">Character</option>
            <option value="episode">Episode</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchType} name`}
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 focus:outline-none border border-black h-full"
          />
          <button
            onClick={handleSearch}
            className="bg-transparent border h-full border-black text-white p-2 rounded-r-md focus:outline-none"
          >
            <FaSearch size={24} color="black" />
          </button>
        </div>
      </div>
      {loading && (
        <p className="flex justify-center text-current text-lg font-bold">
          Loading...
        </p>
      )}
      {locations && !loading ? (
        <>
          <LocationList locations={locations} loading={loading} />
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
            <button
              onClick={fetchPreviousPage}
              disabled={!pageInfo || !pageInfo.prev}
              className="flex items-center justify-center mt-2 sm:mt-0 border border-black  w-28 p-2"
            >
              <FaArrowLeft className="mr-1" />
              Previous
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: pageInfo.pages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => fetchPage(index + 1)}
                  className={`flex items-center justify-center rounded-full border border-black p-2 w-8 ${
                    index + 1 === pageInfo.currentPage ? "bg-gray-200" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={fetchNextPage}
              disabled={!pageInfo || !pageInfo.next}
              className="flex items-center justify-center mt-2 sm:mt-0 border border-black w-28 p-2"
            >
              Next
              <FaArrowRight className="ml-1" />
            </button>
          </div>
        </>
      ) : (
        <p className="flex justify-center text-current text-lg font-bold">
          Sorry, No Loction found 😔
        </p>
      )}

      {showModal && !searchLoading && (
        <Modal onClose={handleModalClose}>
          {characters.length == 0 || episodes.length == 0 ? (
            <p>No {searchType} found</p>
          ) : (
            <>
              {characters &&
                characters.length > 0 &&
                searchType == "character" && (
                  <CustomModalContent
                    data={characters}
                    title="Character Names"
                    linkPrefix="/residents"
                  />
                )}

              {episodes && episodes.length > 0 && searchType == "episode" && (
                <CustomModalContent
                  data={episodes}
                  title="Episodes"
                  linkPrefix="/episodes"
                />
              )}
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Home;

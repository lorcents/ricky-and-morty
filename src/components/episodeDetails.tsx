"use client";
import { useState, useEffect } from "react";
import { Episode, Residents } from "@/app/tpyes";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ResidentsGrid } from "./residentGrid";
import { useDispatch } from "react-redux";
import { updateResidents } from "@/store/actions";

interface EpisodeDetailsProps {
  episode: Episode;
}
const EpisodeDetails: React.FC<EpisodeDetailsProps> = ({ episode }) => {
  const route = useRouter();
  const dispatch = useDispatch();
  const residentsPerPage = 20;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [residents, setResidents] = useState<Residents[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(episode.characters.length / residentsPerPage));

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        setLoading(true);

        const startIdx = (currentPage - 1) * residentsPerPage;
        const endIdx = startIdx + residentsPerPage;

        const residentPromises = episode.characters
          .slice(startIdx, endIdx)
          .map(async (residentUrl: string) => {
            const response = await fetch(residentUrl);
            return response.json();
          });

        const residentData = await Promise.all(residentPromises);
        setResidents(residentData);
        dispatch(updateResidents(residentData));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching residents:", error);
        setLoading(false);
      }
    };
    if (episode.characters.length > 0) {
      fetchResidents();
    }
  }, [episode.characters, currentPage, dispatch]);
  const handleClick = (residentId: number) => {
    route.push(`/residents/${residentId}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="m-8">
      <span
        onClick={() => route.push("/")}
        className="sm:flex items-center ml-8 hover:cursor-pointer mb-2 "
      >
        <FaArrowLeft size={24} color="black" />
        <p className="p-2">Back Home</p>
      </span>

      <div className="relative mb-2 border border-gray-400 p-4 rounded-md sm:flex sm:justify-between ">
        <div className="mb-2 sm:mb-0">
          <div className="font-bold">Name: {episode.name}</div>
          <div className="font-bold">Episode: {episode.episode}</div>
        </div>
        <div className="font-bold sm:ml-4">Air Date: {episode.air_date}</div>
      </div>

      {loading  ? (
        <p>Loadng characters .....</p>
      ) : (
        <>
        <h2 className="text-xl font-bold mb-4">
        Characters{" "}
            <span className="rounded-full bg-blue-500 text-sm text-white p-1">
              {episode.characters.length}{" "}
            </span>
          </h2>
        <ResidentsGrid residents={residents} handleClick={handleClick} />
        </>
      )}

      {totalPages > 1 && !loading && (
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

export default EpisodeDetails;

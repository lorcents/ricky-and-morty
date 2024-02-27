import React, { useEffect, useState } from "react";
import { Residents, Episode } from "@/app/tpyes";
import Modal from "./modal";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { updateResidentsNotes } from "@/store/actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";

interface LocationDetailsProps {
  resident: Residents;
}

const ResidentDetails: React.FC<LocationDetailsProps> = ({ resident }) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState("");

  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      const episodeDataPromises = resident.episode.map((url) =>
        fetch(url).then((response) => response.json())
      );
      const episodeData = await Promise.all(episodeDataPromises);
      setEpisodes(episodeData);
    };

    fetchEpisodeData();
  }, [resident]);

  const handleAddNotes = () => {
    if (resident.notes) {
      setNotes(resident.notes);
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleNotesSubmit = () => {
    dispatch(updateResidentsNotes(resident.id, notes));
    setShowModal(false);
    toast.success(
      `${resident.notes ? "Edited note " : "Added note"} successfully`
    );
  };

  return (
    <>
      <span
        onClick={() => route.push("/")}
        className="sm:flex items-center ml-8 hover:cursor-pointer "
      >
        <FaArrowLeft size={24} color="black" />
        <p className="p-2">Back Home</p>
      </span>
      {/* Resident Details */}
      <div className="flex flex-col md:flex-row m-4">
        {/* Left side (1/3 width) */}
        <div className="w-full md:w-1/3 p-4">
          <Image
            src={resident.image}
            alt={resident.name}
            width={500}
            height={500}
            className="w-full h-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">{resident.name}</h1>
          <p
            className={`text-sm font-medium  ${
              resident.status.toLowerCase() === "alive"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            Status: {resident.status}
          </p>
          <p className="text-sm font-medium">Gender: {resident.gender}</p>
          <p className="text-sm font-medium">Type: {resident.type}</p>
          <p className="text-sm font-medium">Species: {resident.species}</p>
          <p className="text-sm font-medium">Location: {resident.location.name}</p>
          {resident.notes && (
            <div className="mt-2 border-t pt-2 rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 flex flex-col">
              <div className="flex  justify-between w-full px-2 py-1">
                <p className="text-gray-500 dark:text-gray-300">Note</p>
                <FaPencilAlt
                  onClick={handleAddNotes}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer"
                />
              </div>
              <div className="px-2 py-1  text-gray-700 dark:text-gray-200 text-sm font-bold whitespace-pre-line break-words">
                {resident.notes}
              </div>
            </div>
          )}
          {!resident.notes && (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleAddNotes}
            >
              Add Note
            </button>
          )}
        </div>

        {/* Right side (2/3 width) */}
        <div className="w-full md:w-2/3 p-4 border-l md:border-l-0">
          {/* List of Episodes */}
          <h2 className="text-xl font-bold mb-4">
            Episodes{" "}
            <span className="rounded-full bg-blue-500 text-sm text-white p-1">
              {resident.episode.length}{" "}
            </span>
          </h2>

          <div>
            {episodes.map((episode, index) => (
              <div
                key={index}
                onClick={()=>route.push(`/episodes/${episode.id}`)}
                className="relative mb-2 border border-gray-400 p-4 rounded-md sm:flex sm:justify-between hover:bg-gray-100 cursor-pointer"
              >
                <div className="mb-2 sm:mb-0">
                  <div className="font-bold">Name: {episode.name}</div>
                  <div className="font-bold">Episode: {episode.episode}</div>
                </div>
                <div className="font-bold sm:ml-4">
                  Air Date: {episode.air_date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={handleModalClose}>
          <div className="p-4">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              {resident.notes ? "Edit Note" : "Add Note"}
            </label>
            <textarea
              id="notes"
              rows={4}
              className="mt-1 p-2 w-full border rounded-md"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleNotesSubmit}
            >
              Submit
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ResidentDetails;

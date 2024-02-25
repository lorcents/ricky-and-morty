"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EpisodeDetails from "@/components/episodeDetails";

const EpisodePage = () => {
  const params = useParams();
  const id = params.id;
  const [episodeData, setEpisodeData] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        const data = await response.json();
        setEpisodeData(data);
      } catch (error) {
        console.error("Error fetching episode details:", error);
      }
    };

    if (id) {
      fetchEpisodeDetails();
    }
  }, [id]);

  return (
    <>
      {episodeData ? (
        <EpisodeDetails episode={episodeData} />
      ) : (
        <p>Loading episode details...</p>
      )}
    </>
  );
};

export default EpisodePage;

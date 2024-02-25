"use client";
import { useState, useEffect, useCallback } from "react";
import { Episode, Location, Residents } from "../app/tpyes";
import { useDispatch } from "react-redux";
import { updateLocations, updateResidents } from "@/store/actions";

interface PageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
  currentPage: number;
}

const useLocations = () => {
  const dispatch = useDispatch();
  const [locations, setLocations] = useState<Location[]>([]);
  const [characters, setCharacters] = useState<Residents[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(true);

  const fetchLocations = useCallback(
    async (url: string) => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();

        setLocations(data.results);
        dispatch(updateLocations(data.results));
        setPageInfo({
          count: data.info.count,
          pages: data.info.pages,
          next: data.info.next,
          prev: data.info.prev,
          currentPage: calculateCurrentPage(url),
        });
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const calculateCurrentPage = (url: string): number => {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  };

  useEffect(() => {
    // Fetch the first page initially
    fetchLocations("https://rickandmortyapi.com/api/location");
  }, [fetchLocations]);

  const fetchNextPage = () => {
    if (pageInfo && pageInfo.next) {
      fetchLocations(pageInfo.next);
    }
  };

  const fetchPreviousPage = () => {
    if (pageInfo && pageInfo.prev) {
      fetchLocations(pageInfo.prev);
    }
  };

  const fetchPage = (pageNumber: number) => {
    const url = `https://rickandmortyapi.com/api/location?page=${pageNumber}`;
    fetchLocations(url);
  };

  const handleLocationSearch = (term: string) => {
    const url = term
      ? `https://rickandmortyapi.com/api/location/?name=${term}`
      : 'https://rickandmortyapi.com/api/location'; 
    fetchLocations(url);
  };

  const handleCharacterSearch = async(term: string) => {
    const url = `https://rickandmortyapi.com/api/character/?name=${term}`;
    try {
      setSearchLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if(!data.results)return
      dispatch(updateResidents(data.results));
      setCharacters(data.results)
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleEpisodeSearch = async(code: string) => {
    const url = `https://rickandmortyapi.com/api/episode/?episode=${code}`;
    try {
      setSearchLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if(!data.results)return
      setEpisodes(data.results)
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    locations,
    pageInfo,
    fetchNextPage,
    fetchPreviousPage,
    loading,
    fetchPage,
    handleLocationSearch,
    handleCharacterSearch,
    characters,
    handleEpisodeSearch,
    episodes,
    searchLoading
  };
};

export default useLocations;

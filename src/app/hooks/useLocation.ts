'use client'
// hooks/useLocations.ts
import { useState, useEffect } from 'react';
import { Location } from '../tpyes';

interface PageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
  currentPage:number;
}

const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLocations = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      setLocations(data.results);
      setPageInfo({
        count: data.info.count,
        pages: data.info.pages,
        next: data.info.next,
        prev: data.info.prev,
        currentPage: calculateCurrentPage(url),

      });
    } catch (error) {
      console.error('Error fetching locations:', error);
    }finally {
      setLoading(false);
    }

  };

  const calculateCurrentPage = (url: string): number => {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  };

  useEffect(() => {
    // Fetch the first page initially
    fetchLocations('https://rickandmortyapi.com/api/location');
  }, []);

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

  const handleSearch = (term: string) => {
    const url = `https://rickandmortyapi.com/api/location/?name=${term}`;
    fetchLocations(url);
  };

  return { locations, pageInfo, fetchNextPage, fetchPreviousPage,loading ,fetchPage,handleSearch};
};

export default useLocations;

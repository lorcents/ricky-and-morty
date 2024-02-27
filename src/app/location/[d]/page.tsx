// pages/location/[id].tsx
"use client";
import React,{useEffect,useState} from "react";
import { useRouter, useParams } from "next/navigation";
import LocationDetails from "@/components/locationDetails";
import { useSelector } from "react-redux";
import { Location } from "@/app/tpyes";
import { RootState } from "@/store/reducers";
const LocationPage = () => {
  const locations = useSelector((state: RootState) => state.locations);
  const params = useParams();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.d) {
          // Find the selected location based on the ID in Redux store
          const selectedLtn = locations.find((location) => location.id === +params.d);

          if (selectedLtn) {
            setSelectedLocation(selectedLtn);
          } else {
            // If not found in Redux store, fetch from API
            const response = await fetch(`https://rickandmortyapi.com/api/location/${params.d}`);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setSelectedLocation(data);
          }
        }
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.d, locations]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error || !selectedLocation) {
    return (
      <p className="flex justify-center text-current text-lg font-bold">
        {error ? `Error: ${error}` : 'Sorry, No Location found 😔'}
      </p>
    );
  }


  return <LocationDetails location={selectedLocation} />;
};

export default LocationPage;

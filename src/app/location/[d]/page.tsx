// pages/location/[id].tsx
"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import LocationDetails from "@/components/locationDetails";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
const LocationPage = () => {
  const locations = useSelector((state: RootState) => state.locations);
  const router = useRouter();
  const params = useParams();

  if (!params.d || locations.length === 0) {
    return <p>Loading</p>;
  }

  // Find the selected location based on the ID
  const selectedLocation = params
    ? locations.find((location) => location.id === +params.d)
    : undefined;

  if (!selectedLocation) {
    return (
      <p className="flex justify-center text-current text-lg font-bold">
        Sorry, No Location found 😔
      </p>
    );
  }

  return <LocationDetails location={selectedLocation} />;
};

export default LocationPage;

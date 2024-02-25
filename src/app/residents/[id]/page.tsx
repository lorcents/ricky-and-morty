"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import ResidentDetails from "@/components/residentDetails";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
const PesidentPage = () => {
  const residents = useSelector((state: RootState) => state.residents);
  const router = useRouter();
  const params = useParams();

  if (!params.id || residents.length === 0) {
    return <p>Loading</p>;
  }

  const selectedResident = params
    ? residents.find((resident) => resident.id === +params.id)
    : undefined;

  if (!selectedResident) {
    return <p className="flex justify-center text-current text-lg font-bold">
    Sorry, No location found 😔
  </p>
  }

  return(
  <>
  
  <ResidentDetails resident={selectedResident} />;
  

  </>
  )
   
};

export default PesidentPage;

import { Location,Residents } from "@/app/tpyes";


export const UPDATE_LOCATIONS = 'UPDATE_LOCATIONS' as const;
export const UPDATE_RESIDENTS = 'UPDATE_RESIDENTS' as const;
export const UPDATE_RESIDENT_NOTES = 'UPDATE_RESIDENT_NOTES' as const;



export const updateLocations = (locations: Location[]) => ({
  type: UPDATE_LOCATIONS,
  payload: locations,
});

export const updateResidents = (residents: Residents[]) => ({
  type: UPDATE_RESIDENTS,
  payload: residents,
});

export const updateResidentsNotes = (id: number, notes: string) => ({
  type: UPDATE_RESIDENT_NOTES,
  payload: { id, notes },
});


type LocationAction = ReturnType<typeof updateLocations> | ReturnType<typeof updateResidents> | ReturnType<typeof updateResidentsNotes>;

export default LocationAction;

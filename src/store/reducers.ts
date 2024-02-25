import LocationAction from "./actions";
import { Location, Residents } from "@/app/tpyes";
export interface RootState {
  locations: Location[];
  residents: Residents[];
}

const initialState: RootState = {
  locations: [],
  residents: [],
};




const locationsReducer = (
  state: RootState = initialState,
  action: LocationAction
): RootState => {
  switch (action.type) {
    case "UPDATE_LOCATIONS":
      const newLocations = action.payload.filter(
        (newLocation) =>
          !state.locations.some(
            (existingLocation) => existingLocation.id === newLocation.id
          )
      );
      return { ...state, locations: [...state.locations, ...newLocations] };

    case "UPDATE_RESIDENTS":
      const newResidents = action.payload.filter(
        (newResident) =>
          !state.residents.some(
            (existingResident) => existingResident.id === newResident.id
          )
      );
      return { ...state, residents: [...state.residents, ...newResidents] };

    case "UPDATE_RESIDENT_NOTES":
      const { id, notes } = action.payload;
      const updatedResidents = state.residents.map((resident) => {
        if (resident.id === id) {
          return { ...resident, notes: notes };
        }
        return resident;
      });
      return { ...state, residents: updatedResidents };

    default:
      return state;
  }
};

export default locationsReducer;

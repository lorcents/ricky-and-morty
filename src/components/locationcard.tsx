import Link from "next/link";
import { Location } from "../app/tpyes";

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md m-4">
      <h3 className="text-2xl font-bold text-white">{location.name}</h3>
      <p className="text-lg text-gray-400">Type: {location.type}</p>
      <Link href={`/location/${location.id}`}>
        <span className="text-blue-500 hover:underline">View Residents</span>
      </Link>
    </div>
  );
};

export default LocationCard;

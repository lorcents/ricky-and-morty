import Image from "next/image";
import { Residents } from "@/app/tpyes";
export const ResidentsGrid: React.FC<{
    residents: Residents[];
    handleClick: (id: number) => void;
  }> = ({ residents, handleClick }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {residents.map((resident) => (
        <div
          key={resident.id}
          className="bg-white p-4 rounded-md shadow-md card hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out"
          onClick={() => handleClick(resident.id)}
        >
          <Image
            src={resident.image}
            alt={resident.name}
            width={500}
            height={500}
            className="w-full h-48 object-cover mb-4 rounded-md"
            loading="lazy"
          />
          <h3 className="text-lg font-semibold mb-2">{resident.name}</h3>
          <p
            className={`text-sm font-medium  ${
              resident.status.toLowerCase() === "alive"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            Status: {resident.status}
          </p>
          <p className="text-sm font-medium">Species: {resident.species}</p>
        </div>
      ))}
    </div>
  );
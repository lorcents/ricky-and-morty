import { Episode, Residents } from '@/app/tpyes';
import Link from 'next/link';

interface CustomModalContentProps {
  data: Residents[] | Episode[];
  title: string;
  linkPrefix: string;
}

export const CustomModalContent: React.FC<CustomModalContentProps> = ({ data, title, linkPrefix }) => (
  <div className="max-h-full overflow-y-auto">
    <h2>{title}</h2>
    <ul>
      {data.map((item) => (
        <li
          key={item.id}
          className="py-2 pl-2 underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          <Link href={`${linkPrefix}/${item.id}`}>
            {title === 'Episodes' ? `${item.episode} - ${item.name}` : item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
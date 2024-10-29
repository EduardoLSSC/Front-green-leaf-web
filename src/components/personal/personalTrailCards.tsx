import logo from "@/assets/images/trilhaexemplo.jpg";
import Image from "next/image";
interface TrailCardProps {
    image: string;
    title: string;
    distance: string;
    location: string;
  }
  
  const PersonalTrailCards: React.FC<TrailCardProps> = ({ image, title, distance, location }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Image src={logo} alt={title} className="h-40 w-full object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{distance}</p>
          <p className="text-sm text-gray-400">{location}</p>
        </div>
      </div>
    );
  };
  
  export default PersonalTrailCards;
import logo from "@/assets/images/trilhaexemplo.jpg";
import Image, { StaticImageData } from 'next/image';

interface TrailCardProps {
  image: string | StaticImageData;
  title: string;
  distance: string;
  location: string;
}
  
  const PersonalTrailCards: React.FC<TrailCardProps> = ({ image, title, distance, location }) => {
    return (
      <div className="trail-card bg-white shadow-md rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
          layout="responsive"
          width={300}
          height={200}
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-600">Distância: {distance}</p>
          <p className="text-gray-600">Localização: {location}</p>
        </div>
      </div>
    );
  };
  
  export default PersonalTrailCards;
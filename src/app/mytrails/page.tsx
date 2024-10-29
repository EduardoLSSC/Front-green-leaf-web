import TrailCard from '@/components/personal/personalTrailCards';
import logo from "@/assets/images/logoBg.png";
const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Minhas Trilhas</h1>
          
          <div className="flex items-center space-x-2 text-sm">
            <span>Editado em — 22/2/2024</span>
            <button className="bg-gray-200 px-3 py-1 rounded-full">Default</button>
            <button className="bg-gray-200 px-3 py-1 rounded-full">A-Z</button>
            <button className="bg-gray-200 px-3 py-1 rounded-full">Lista</button>
          </div>
        </header>
        <hr className='mt-4 pt-2' />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <TrailCard
            image="@/assets/images/logoBg.png"
            title="Só Caminha"
            distance="5 Km"
            location="Localizado em Goiás"
          />
          <TrailCard
            image="@/assets/images/logoBg.png"
            title="Alto da Boa Vista"
            distance="7 Km"
            location="Localizado em Espírito Santo"
          />
          <TrailCard
            image="@/assets/images/logoBg.png"
            title="Sempre a Cima"
            distance="9 Km"
            location="Localizado em Brasília"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button className="bg-green-600 text-white p-3 rounded-full">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
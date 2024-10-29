"use client"
import { useState } from 'react';

type TrailFormData = {
  name: string;
  distance: string;
  difficulty: string;
  description: string;
  cep: string;
  address: string;
};

const TrailForm = () => {
  const [formData, setFormData] = useState<TrailFormData>({
    name: '',
    distance: '',
    difficulty: 'easy',
    description: '',
    cep: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div>
        <label>Distância (Km):</label>
        <input
          type="text"
          name="distance"
          value={formData.distance}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div>
        <label>Dificuldade:</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
      </div>

      <div className="col-span-2">
        <label>Descrição:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="col-span-2">
        <label>CEP:</label>
        <input
          type="text"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="col-span-2">
        <label>Endereço:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <button type="submit" className="col-span-2 bg-green-500 text-white p-2 rounded">Salvar</button>
    </form>
  );
};

export default TrailForm;

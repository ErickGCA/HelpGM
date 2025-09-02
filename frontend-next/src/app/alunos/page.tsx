'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Exercise {
  id?: number;
  name: string;
  description: string;
  image?: string;
  video?: string;
  exerciseType: 'STRENGTH' | 'CARDIO' | 'BALANCE' | 'FLEXIBILITY' | 'REHABILITATION';
  muscleGroup: 'CHEST' | 'BACK' | 'SHOULDERS' | 'ARMS' | 'LEGS' | 'ABS';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  equipment?: string;
  instructions?: string;
  tips?: string;
  variations?: string;
}

export default function ExerciciosPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [formData, setFormData] = useState<Exercise>({
    name: '',
    description: '',
    image: '',
    video: '',
    exerciseType: 'STRENGTH',
    muscleGroup: 'CHEST',
    difficulty: 'BEGINNER',
    equipment: '',
    instructions: '',
    tips: '',
    variations: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/exercises')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setExercises(data))
      .catch(err => {
        console.error('Erro ao buscar exercícios:', err);
        setExercises([]);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        const method = editingExercise ? 'PUT' : 'POST';
        const url = editingExercise ? `http://localhost:8080/api/exercises/${editingExercise.id}` : 'http://localhost:8080/api/exercises';

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!res.ok) {
            throw new Error('Erro ao criar/atualizar exercício');
        }
        const savedExercise = await res.json();
        setExercises(prev => {
            if (editingExercise) {
              return prev.map(ex => ex.id === savedExercise.id ? savedExercise : ex);
            } else {
              return [...prev, savedExercise];
            }
          });
        resetForm();
    } catch (err) {
        console.error('Erro ao criar/atualizar exercício:', err);
    }
  };


  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setFormData({ ...exercise });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este exercício?')) return;

    try {
      const res = await fetch(`http://localhost:8080/api/exercises/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('Erro ao deletar');

      setExercises(prev => prev.filter(ex => ex.id !== id));
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao deletar o exercício.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      video: '',
      exerciseType: 'STRENGTH',
      muscleGroup: 'CHEST',
      difficulty: 'BEGINNER',
      equipment: '',
      instructions: '',
      tips: '',
      variations: ''
    });
    setEditingExercise(null);
    setIsModalOpen(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER': return 'bg-green-100 text-green-800';
      case 'INTERMEDIATE': return 'bg-yellow-100 text-yellow-800';
      case 'ADVANCED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'STRENGTH': return 'bg-blue-100 text-blue-800';
      case 'CARDIO': return 'bg-purple-100 text-purple-800';
      case 'BALANCE': return 'bg-indigo-100 text-indigo-800';
      case 'FLEXIBILITY': return 'bg-pink-100 text-pink-800';
      case 'REHABILITATION': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Exercícios</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os exercícios da academia</p>
        </div>
        <div className="mb-6">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            + Adicionar Exercício
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exercício
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grupo Muscular
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dificuldade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {exercises.map((exercise) => (
                  <tr key={exercise.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{exercise.name}</div>
                        <div className="text-sm text-gray-500">ID: {exercise.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {exercise.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(exercise.exerciseType)}`}>
                        {exercise.exerciseType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {exercise.muscleGroup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(exercise)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(exercise.id!)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingExercise ? 'Editar Exercício' : 'Adicionar Novo Exercício'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome do Exercício *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Exercício *
                      </label>
                      <select
                        name="exerciseType"
                        value={formData.exerciseType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="STRENGTH">Força</option>
                        <option value="CARDIO">Cardio</option>
                        <option value="BALANCE">Equilíbrio</option>
                        <option value="FLEXIBILITY">Flexibilidade</option>
                        <option value="REHABILITATION">Reabilitação</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grupo Muscular *
                      </label>
                      <select
                        name="muscleGroup"
                        value={formData.muscleGroup}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="CHEST">Peito</option>
                        <option value="BACK">Costas</option>
                        <option value="SHOULDERS">Ombros</option>
                        <option value="ARMS">Braços</option>
                        <option value="LEGS">Pernas</option>
                        <option value="ABS">Abdômen</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nível de Dificuldade *
                      </label>
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="BEGINNER">Iniciante</option>
                        <option value="INTERMEDIATE">Intermediário</option>
                        <option value="ADVANCED">Avançado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Equipamento
                      </label>
                      <Input
                        type="text"
                        name="equipment"
                        value={formData.equipment}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL da Imagem
                      </label>
                      <Input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL do Vídeo
                    </label>
                    <Input
                      type="url"
                      name="video"
                      value={formData.video}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instruções
                    </label>
                    <textarea
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Passo a passo para executar o exercício..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dicas
                      </label>
                      <textarea
                        name="tips"
                        value={formData.tips}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Dicas para melhor execução..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Variações
                      </label>
                      <textarea
                        name="variations"
                        value={formData.variations}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Variações do exercício..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                      {editingExercise ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
  
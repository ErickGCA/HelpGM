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
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');

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

  const getMuscleGroupIcon = (muscle: string) => {
    switch (muscle) {
      case 'CHEST': return '💪';
      case 'BACK': return '🦴';
      case 'SHOULDERS': return '🏋️';
      case 'ARMS': return '💪';
      case 'LEGS': return '🦵';
      case 'ABS': return '🔥';
      default: return '💪';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'STRENGTH': return '🏋️';
      case 'CARDIO': return '❤️';
      case 'BALANCE': return '⚖️';
      case 'FLEXIBILITY': return '🧘';
      case 'REHABILITATION': return '🏥';
      default: return '💪';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER': return '🟢';
      case 'INTERMEDIATE': return '🟡';
      case 'ADVANCED': return '🔴';
      default: return '⚪';
    }
  };

  // Filtros
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || exercise.exerciseType === selectedType;
    const matchesMuscle = selectedMuscle === 'ALL' || exercise.muscleGroup === selectedMuscle;
    const matchesDifficulty = selectedDifficulty === 'ALL' || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesType && matchesMuscle && matchesDifficulty;
  });

  const openExerciseModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Biblioteca de Exercícios</h1>
          <p className="text-gray-600 mt-2">Explore e aprenda a executar exercícios corretamente</p>
        </div>

        {/* Controles */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Buscar exercícios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Todos os Tipos</option>
              <option value="STRENGTH">Força</option>
              <option value="CARDIO">Cardio</option>
              <option value="BALANCE">Equilíbrio</option>
              <option value="FLEXIBILITY">Flexibilidade</option>
              <option value="REHABILITATION">Reabilitação</option>
            </select>

            <select
              value={selectedMuscle}
              onChange={(e) => setSelectedMuscle(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Todos os Músculos</option>
              <option value="CHEST">Peito</option>
              <option value="BACK">Costas</option>
              <option value="SHOULDERS">Ombros</option>
              <option value="ARMS">Braços</option>
              <option value="LEGS">Pernas</option>
              <option value="ABS">Abdômen</option>
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Todas as Dificuldades</option>
              <option value="BEGINNER">Iniciante</option>
              <option value="INTERMEDIATE">Intermediário</option>
              <option value="ADVANCED">Avançado</option>
            </select>
          </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg whitespace-nowrap"
          >
            + Adicionar Exercício
          </Button>
        </div>

        {/* Grid de Exercícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden"
              onClick={() => openExerciseModal(exercise)}
            >
              {/* Imagem do Exercício */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                {exercise.image ? (
                  <img 
                    src={exercise.image} 
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl text-gray-400">
                    {getMuscleGroupIcon(exercise.muscleGroup)}
                  </div>
                )}
              </div>

              {/* Informações do Exercício */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {exercise.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {exercise.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(exercise.exerciseType)}`}>
                    {getTypeIcon(exercise.exerciseType)} {exercise.exerciseType}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                    {getDifficultyIcon(exercise.difficulty)} {exercise.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {getMuscleGroupIcon(exercise.muscleGroup)} {exercise.muscleGroup}
                  </span>
                  
                  {/* Botões de Ação */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(exercise);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(exercise.id!);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏋️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum exercício encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou adicionar novos exercícios</p>
          </div>
        )}

        {/* Modal de Visualização do Exercício */}
        {selectedExercise && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedExercise.name}</h3>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Imagem/Vídeo */}
              <div className="mb-6">
                {selectedExercise.video ? (
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎥</div>
                      <p className="text-gray-600">Vídeo disponível</p>
                      <a 
                        href={selectedExercise.video} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                      >
                        Ver vídeo
                      </a>
                    </div>
                  </div>
                ) : selectedExercise.image ? (
                  <img 
                    src={selectedExercise.image} 
                    alt={selectedExercise.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-8xl text-gray-400">
                      {getMuscleGroupIcon(selectedExercise.muscleGroup)}
                    </div>
                  </div>
                )}
              </div>

              {/* Informações Detalhadas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h4>
                  <p className="text-gray-700 mb-4">{selectedExercise.description}</p>

                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Características</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Tipo:</span>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(selectedExercise.exerciseType)}`}>
                        {getTypeIcon(selectedExercise.exerciseType)} {selectedExercise.exerciseType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Grupo Muscular:</span>
                      <span className="text-gray-900">{getMuscleGroupIcon(selectedExercise.muscleGroup)} {selectedExercise.muscleGroup}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Dificuldade:</span>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(selectedExercise.difficulty)}`}>
                        {getDifficultyIcon(selectedExercise.difficulty)} {selectedExercise.difficulty}
                      </span>
                    </div>
                    {selectedExercise.equipment && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Equipamento:</span>
                        <span className="text-gray-900">{selectedExercise.equipment}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {selectedExercise.instructions && (
                    <>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Instruções de Execução</h4>
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <p className="text-gray-700 whitespace-pre-line">{selectedExercise.instructions}</p>
                      </div>
                    </>
                  )}

                  {selectedExercise.tips && (
                    <>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Dicas Importantes</h4>
                      <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                        <p className="text-gray-700 whitespace-pre-line">{selectedExercise.tips}</p>
                      </div>
                    </>
                  )}

                  {selectedExercise.variations && (
                    <>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Variações</h4>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-gray-700 whitespace-pre-line">{selectedExercise.variations}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t">
                <Button
                  onClick={() => setSelectedExercise(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Adição/Edição */}
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
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Exercise, WorkoutDay, WorkoutPlan, WorkoutProgress } from '@/types/workout';
import { ProgressChart } from '@/components/workout/ProgressChart';
import { QuickStats } from '@/components/workout/QuickStats';

export default function FichaVivaPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'day' | 'exercise'>('overview');

  const mockStats = {
    totalWorkouts: 24,
    currentStreak: 5,
    bestStreak: 12,
    totalTime: 2880, 
    averageTime: 120 
  };

  const mockProgress: WorkoutProgress[] = [
    { date: '2024-01-15', totalExercises: 12, completedExercises: 12, totalWeight: 1200, duration: 75 },
    { date: '2024-01-16', totalExercises: 10, completedExercises: 8, totalWeight: 980, duration: 60 },
    { date: '2024-01-17', totalExercises: 12, completedExercises: 12, totalWeight: 1350, duration: 80 },
    { date: '2024-01-18', totalExercises: 0, completedExercises: 0, totalWeight: 0, duration: 0 },
    { date: '2024-01-19', totalExercises: 10, completedExercises: 10, totalWeight: 1100, duration: 70 },
    { date: '2024-01-20', totalExercises: 12, completedExercises: 11, totalWeight: 1250, duration: 85 },
    { date: '2024-01-21', totalExercises: 8, completedExercises: 6, totalWeight: 800, duration: 50 }
  ];

  const mockWorkoutPlans: WorkoutPlan[] = [
    {
      id: 1,
      name: 'Treino Iniciante - Full Body',
      description: 'Treino completo para iniciantes, 3x por semana',
      level: 'beginner',
      createdAt: '2024-01-15',
      userId: 1,
      days: [
        {
          id: 1,
          name: 'Segunda-feira',
          isCompleted: false,
          exercises: [
            { id: 1, name: 'Agachamento', sets: 3, reps: '10-12', weight: 0, rest: '90s', notes: 'Foco na técnica' },
            { id: 2, name: 'Flexão de Braço', sets: 3, reps: '8-10', rest: '60s', notes: 'Pode fazer de joelhos se necessário' },
            { id: 3, name: 'Remada Curvada', sets: 3, reps: '10-12', weight: 0, rest: '90s', notes: 'Mantenha as costas retas' },
            { id: 4, name: 'Prancha', sets: 3, reps: '30s', rest: '60s', notes: 'Mantenha o corpo alinhado' }
          ]
        },
        {
          id: 2,
          name: 'Quarta-feira',
          isCompleted: false,
          exercises: [
            { id: 5, name: 'Stiff', sets: 3, reps: '10-12', weight: 0, rest: '90s', notes: 'Foco nos posteriores' },
            { id: 6, name: 'Supino Reto', sets: 3, reps: '8-10', weight: 0, rest: '90s', notes: 'Controle o movimento' },
            { id: 7, name: 'Puxada na Frente', sets: 3, reps: '10-12', weight: 0, rest: '90s', notes: 'Puxe em direção ao peito' },
            { id: 8, name: 'Abdominal Crunch', sets: 3, reps: '15-20', rest: '45s', notes: 'Controle o movimento' }
          ]
        },
        {
          id: 3,
          name: 'Sexta-feira',
          isCompleted: false,
          exercises: [
            { id: 9, name: 'Leg Press', sets: 3, reps: '12-15', weight: 0, rest: '90s', notes: 'Ajuste o banco confortavelmente' },
            { id: 10, name: 'Desenvolvimento com Halteres', sets: 3, reps: '8-10', weight: 0, rest: '90s', notes: 'Mantenha o core ativo' },
            { id: 11, name: 'Rosca Direta', sets: 3, reps: '10-12', weight: 0, rest: '60s', notes: 'Controle o movimento' },
            { id: 12, name: 'Elevação Lateral', sets: 3, reps: '10-12', weight: 0, rest: '60s', notes: 'Mantenha os cotovelos levemente flexionados' }
          ]
        }
      ]
    }
  ];

  const handlePlanSelect = (plan: WorkoutPlan) => {
    setSelectedPlan(plan);
    setViewMode('overview');
  };

  const handleDaySelect = (day: WorkoutDay) => {
    setSelectedDay(day);
    setViewMode('day');
  };

  const toggleExerciseCompletion = (exerciseId: number) => {
    if (!selectedDay) return;
    
    const updatedDay = {
      ...selectedDay,
      exercises: selectedDay.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, isCompleted: !ex.isCompleted } : ex
      )
    };
    
    setSelectedDay(updatedDay);
    if (selectedPlan) {
      const updatedPlan = {
        ...selectedPlan,
        days: selectedPlan.days.map(d => 
          d.id === selectedDay.id ? updatedDay : d
        )
      };
      setSelectedPlan(updatedPlan);
    }
  };

  const getProgressPercentage = () => {
    if (!selectedPlan) return 0;
    const totalExercises = selectedPlan.days.reduce((acc, day) => acc + day.exercises.length, 0);
    const completedExercises = selectedPlan.days.reduce((acc, day) => 
      acc + day.exercises.filter(ex => ex.isCompleted).length, 0
    );
    return Math.round((completedExercises / totalExercises) * 100);
  };

  if (viewMode === 'day' && selectedDay) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  onClick={() => setViewMode('overview')}
                  className="mr-4"
                >
                  ← Voltar
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">{selectedDay.name}</h1>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                Dashboard
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Exercícios do Dia
            </h2>
            <div className="space-y-4">
              {selectedDay.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className={`border rounded-lg p-4 transition-all duration-200 ${
                    exercise.isCompleted 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 mr-3">
                          {index + 1}.
                        </span>
                        <h3 className="text-lg font-medium text-gray-900">
                          {exercise.name}
                        </h3>
                        {exercise.isCompleted && (
                          <span className="ml-2 text-green-600 text-sm">✓ Concluído</span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Séries:</span> {exercise.sets}
                        </div>
                        <div>
                          <span className="font-medium">Repetições:</span> {exercise.reps}
                        </div>
                        {exercise.weight !== undefined && (
                          <div>
                            <span className="font-medium">Peso:</span> {exercise.weight}kg
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Descanso:</span> {exercise.rest}
                        </div>
                      </div>
                      
                      {exercise.notes && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-md">
                          <span className="text-sm font-medium text-blue-800">Notas:</span>
                          <p className="text-sm text-blue-700 mt-1">{exercise.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant={exercise.isCompleted ? "outline" : "primary"}
                      onClick={() => toggleExerciseCompletion(exercise.id)}
                      className="ml-4"
                    >
                      {exercise.isCompleted ? 'Desmarcar' : 'Concluir'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => setViewMode('overview')}
              className="px-8"
            >
              Voltar ao Plano
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="mr-4"
              >
                ← Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Ficha Viva</h1>
            </div>
            <Button
              variant="primary"
              onClick={() => {/* TODO: Implementar criação de nova ficha */}}
            >
              + Nova Ficha
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!selectedPlan ? (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Escolha seu Plano de Treino
              </h2>
              <p className="text-gray-600">
                Selecione um plano que se adapte ao seu nível e objetivos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockWorkoutPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      plan.level === 'beginner' ? 'bg-green-100 text-green-800' :
                      plan.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {plan.level === 'beginner' ? 'Iniciante' :
                       plan.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {plan.days.length} dias
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Criado em {new Date(plan.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    <Button variant="outline" className="text-blue-600 border-blue-600">
                      Selecionar
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Não encontrou o que procura?
              </p>
              <Button
                variant="primary"
                onClick={() => {/* TODO: Implementar criação personalizada */}}
                className="px-8"
              >
                Criar Ficha Personalizada
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedPlan.name}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setSelectedPlan(null)}
                >
                  Trocar Plano
                </Button>
              </div>
              
              <p className="text-gray-600 mb-4">
                {selectedPlan.description}
              </p>
              
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedPlan.level === 'beginner' ? 'bg-green-100 text-green-800' :
                  selectedPlan.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedPlan.level === 'beginner' ? 'Iniciante' :
                   selectedPlan.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                </span>
                <span className="text-sm text-gray-500">
                  {selectedPlan.days.length} dias por semana
                </span>
              </div>
            </div>
            <div className="mb-8">
              <QuickStats {...mockStats} />
            </div>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Progresso Geral
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {getProgressPercentage()}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {selectedPlan.days.reduce((acc, day) => 
                  acc + day.exercises.filter(ex => ex.isCompleted).length, 0
                )} de {selectedPlan.days.reduce((acc, day) => acc + day.exercises.length, 0)} exercícios concluídos
              </p>
            </div>
            <div className="mb-8">
              <ProgressChart progress={mockProgress} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedPlan.days.map((day) => (
                <div
                  key={day.id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleDaySelect(day)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {day.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      day.isCompleted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {day.isCompleted ? 'Concluído' : 'Pendente'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      {day.exercises.length} exercícios
                    </p>
                    <p className="text-sm text-gray-600">
                      {day.exercises.filter(ex => ex.isCompleted).length} concluídos
                    </p>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${day.exercises.length > 0 ? 
                          (day.exercises.filter(ex => ex.isCompleted).length / day.exercises.length) * 100 : 0
                        }%` 
                      }}
                    ></div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 text-blue-600 border-blue-600"
                  >
                    Ver Treino
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Ações Rápidas
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => {/* TODO: Implementar histórico */}}
                >
                   Ver Histórico
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {/* TODO: Implementar configurações */}}
                >
                   Configurações
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {/* TODO: Implementar exportar */}}
                >
                   Exportar Ficha
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {/* TODO: Implementar IA */}}
                >
                   Consultar IA
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
  
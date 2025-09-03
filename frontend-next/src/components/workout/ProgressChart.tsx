'use client';

import { WorkoutProgress } from '@/types/workout';

interface ProgressChartProps {
  progress: WorkoutProgress[];
  title?: string;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ 
  progress, 
  title = "Progresso dos Últimos 7 Dias" 
}) => {
  if (!progress || progress.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum dado de progresso disponível</p>
          <p className="text-sm">Complete alguns treinos para ver seu progresso</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(
    ...progress.map(p => Math.max(p.completedExercises, p.totalWeight, p.duration))
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-4">
        {progress.map((day, index) => {
          const exercisePercentage = (day.completedExercises / day.totalExercises) * 100;
          const weightPercentage = (day.totalWeight / maxValue) * 100;
          const durationPercentage = (day.duration / maxValue) * 100;

          return (
            <div key={day.date} className="border-b border-gray-100 pb-3 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {new Date(day.date).toLocaleDateString('pt-BR', { 
                    weekday: 'short', 
                    day: '2-digit',
                    month: '2-digit'
                  })}
                </span>
                <span className="text-xs text-gray-500">
                  {day.completedExercises}/{day.totalExercises} exercícios
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 w-16">Exercícios:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${exercisePercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-8 text-right">
                    {Math.round(exercisePercentage)}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 w-16">Peso:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${weightPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-12 text-right">
                    {day.totalWeight}kg
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 w-16">Tempo:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${durationPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-12 text-right">
                    {day.duration}min
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {progress.reduce((acc, p) => acc + p.completedExercises, 0)}
            </p>
            <p className="text-xs text-gray-500">Exercícios</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {progress.reduce((acc, p) => acc + p.totalWeight, 0)}kg
            </p>
            <p className="text-xs text-gray-500">Peso Total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {progress.reduce((acc, p) => acc + p.duration, 0)}min
            </p>
            <p className="text-xs text-gray-500">Tempo Total</p>
          </div>
        </div>
      </div>
    </div>
  );
};

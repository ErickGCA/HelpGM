'use client';

interface QuickStatsProps {
  totalWorkouts: number;
  currentStreak: number;
  bestStreak: number;
  totalTime: number; 
  averageTime: number; 
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  totalWorkouts,
  currentStreak,
  bestStreak,
  totalTime,
  averageTime
}) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Total de Treinos</p>
            <p className="text-2xl font-bold">{totalWorkouts}</p>
          </div>
          <div className="text-3xl">🏋️</div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Sequência Atual</p>
            <p className="text-2xl font-bold">{currentStreak}</p>
          </div>
          <div className="text-3xl">🔥</div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Melhor Sequência</p>
            <p className="text-2xl font-bold">{bestStreak}</p>
          </div>
          <div className="text-3xl">🏆</div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Tempo Médio</p>
            <p className="text-2xl font-bold">{formatTime(averageTime)}</p>
          </div>
          <div className="text-3xl">⏱️</div>
        </div>
      </div>
    </div>
  );
};

export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  rest: string;
  notes?: string;
  isCompleted?: boolean;
}

export interface WorkoutDay {
  id: number;
  name: string;
  exercises: Exercise[];
  isCompleted: boolean;
}

export interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  days: WorkoutDay[];
  level: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  userId: number;
}

export interface WorkoutSession {
  id: number;
  workoutDayId: number;
  startedAt: string;
  completedAt?: string;
  exercises: {
    exerciseId: number;
    sets: {
      reps: number;
      weight: number;
      isCompleted: boolean;
    }[];
  }[];
}

export interface WorkoutProgress {
  date: string;
  totalExercises: number;
  completedExercises: number;
  totalWeight: number;
  duration: number; 
}

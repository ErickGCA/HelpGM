package com.help.gym.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.help.gym.model.WorkoutDayExercise;

@Repository
public interface WorkoutDayExerciseRepository extends JpaRepository<WorkoutDayExercise, Long> {
    
    List<WorkoutDayExercise> findByWorkoutDayId(Long workoutDayId);
    
    List<WorkoutDayExercise> findByWorkoutDayIdOrderByOrderAsc(Long workoutDayId);
}



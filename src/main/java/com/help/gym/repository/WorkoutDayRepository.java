package com.help.gym.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.help.gym.model.WorkoutDay;

@Repository
public interface WorkoutDayRepository extends JpaRepository<WorkoutDay, Long> {
    
    Optional<WorkoutDay> findByName(String name);
    Optional<WorkoutDay> findByWorkoutPlanId(Long workoutPlanId);
}

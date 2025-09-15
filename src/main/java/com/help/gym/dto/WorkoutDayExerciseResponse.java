package com.help.gym.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.help.gym.model.WorkoutDay;
import com.help.gym.model.Exercise;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDayExerciseResponse {
    
    private Long id;
    private Long workoutDayId;
    private Long exerciseId;
    private Integer sets;
    private Integer reps;
    private Integer weight;
    private Integer restTime;
    private Integer order;
    private String notes;
    private WorkoutDay workoutDay;
    private Exercise exercise;
}

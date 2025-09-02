package com.help.gym.dto;

import com.help.gym.model.Exercise.ExerciseType;
import com.help.gym.model.Exercise.MuscleGroup;
import com.help.gym.model.Exercise.Difficulty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseResponse {
    
    private Long id;
    private String name;
    private String description;
    private String image;
    private String video;
    private ExerciseType exerciseType;
    private MuscleGroup muscleGroup;
    private Difficulty difficulty;
    private String equipment;
    private String instructions;
    private String tips;
    private String variations;
}

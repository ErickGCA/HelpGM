package com.help.gym.dto;

import com.help.gym.model.Exercise.ExerciseType;
import com.help.gym.model.Exercise.MuscleGroup;
import com.help.gym.model.Exercise.Difficulty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseRequest {
    
    @NotBlank(message = "O nome do exercício é obrigatório")
    @Size(min = 3, max = 20, message = "O nome do exercício deve ter entre 3 e 20 caracteres")
    private String name;
    
    @NotBlank(message = "A descrição do exercício é obrigatória")
    @Size(min = 3, max = 200, message = "A descrição do exercício deve ter entre 3 e 200 caracteres")
    private String description;

    private String image;
    private String video;
    
    @NotNull(message = "O tipo de exercício é obrigatório")
    private ExerciseType exerciseType;
    
    @NotNull(message = "O grupo muscular é obrigatório")
    private MuscleGroup muscleGroup;
    
    @NotNull(message = "O nível de dificuldade é obrigatório")
    private Difficulty difficulty;
    
    private String equipment;
    
    @Size(max = 1000, message = "As instruções não podem exceder 1000 caracteres")
    private String instructions;
    
    @Size(max = 500, message = "As dicas não podem exceder 500 caracteres")
    private String tips;
    
    @Size(max = 500, message = "As variações não podem exceder 500 caracteres")
    private String variations;
}

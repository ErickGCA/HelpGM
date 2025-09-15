package com.help.gym.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDayExerciseRequest {
    
    @NotNull(message = "Workout Day ID é obrigatório")
    private Long workoutDayId;
    
    @NotNull(message = "Exercise ID é obrigatório")
    private Long exerciseId;
    
    @NotNull(message = "Número de séries é obrigatório")
    @Positive(message = "Número de séries deve ser positivo")
    private Integer sets;
    
    @NotNull(message = "Número de repetições é obrigatório")
    @Positive(message = "Número de repetições deve ser positivo")
    private Integer reps;
    
    @NotNull(message = "Peso é obrigatório")
    @Positive(message = "Peso deve ser positivo")
    private Integer weight;
    
    @NotNull(message = "Tempo de descanso é obrigatório")
    @Positive(message = "Tempo de descanso deve ser positivo")
    private Integer restTime;
    
    @NotNull(message = "Ordem do exercício é obrigatória")
    @Positive(message = "Ordem do exercício deve ser positiva")
    private Integer order;
    
    @Size(max = 500, message = "Notas não podem exceder 500 caracteres")
    private String notes;
}

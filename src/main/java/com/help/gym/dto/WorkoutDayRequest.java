package com.help.gym.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDayRequest {
    
    @NotBlank(message = "Name cannot be empty")
    private String name;
    
    private String description;
    
    @NotNull(message = "Day order is required")
    @Positive(message = "Day order must be a positive number")
    private Integer dayOrder;
    
    @NotNull(message = "Workout Plan ID is required")
    private Long workoutPlanId;
}

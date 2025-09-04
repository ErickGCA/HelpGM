package com.help.gym.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDayRequest {
    
    private String name;
    private String description;
    private Integer dayOrder;
    private Long workoutPlanId;
}

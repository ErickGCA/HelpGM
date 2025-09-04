package com.help.gym.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutPlanResponse {
    
    private Long id;
    private String name;
    private String description;
    private String level;
    private Long userId;
    private Instant createdAt;
    private Instant updatedAt;
    private List<WorkoutDayResponse> days;
}

package com.help.gym.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.help.gym.model.WorkoutDay;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDayResponse {
    
    private Long id;
    private String name;
    private String description;
    private Integer dayOrder;
    
    public WorkoutDayResponse(WorkoutDay workoutDay) {
        this.id = workoutDay.getId();
        this.name = workoutDay.getName();
        this.description = workoutDay.getDescription();
        this.dayOrder = workoutDay.getDayOrder();
    }
}

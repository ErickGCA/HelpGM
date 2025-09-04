package com.help.gym.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import com.help.gym.repository.WorkoutPlanRepository;
import com.help.gym.repository.UserRepository;
import com.help.gym.model.WorkoutPlan;
import com.help.gym.model.User;
import com.help.gym.dto.WorkoutPlanRequest;
import com.help.gym.dto.WorkoutPlanResponse;
import com.help.gym.dto.WorkoutDayResponse;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkoutPlanService {

    private final WorkoutPlanRepository workoutPlanRepository;
    private final UserRepository userRepository;
    
    public WorkoutPlan save(WorkoutPlan workoutPlan) {
        return workoutPlanRepository.save(workoutPlan);
    }

    public List<WorkoutPlanResponse> findAll() {
        return workoutPlanRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public Optional<WorkoutPlan> findById(Long id) {
        return workoutPlanRepository.findById(id);
    }

    public WorkoutPlanResponse createWorkoutPlan(WorkoutPlanRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        WorkoutPlan workoutPlan = mapToEntity(request);
        workoutPlan.setUser(user);
        
        WorkoutPlan savedWorkoutPlan = workoutPlanRepository.save(workoutPlan);
        return mapToResponse(savedWorkoutPlan);
    }

    public WorkoutPlan mapToEntity(WorkoutPlanRequest request) {
        return WorkoutPlan.builder()
                .name(request.getName())
                .description(request.getDescription())
                .level(request.getLevel())
                .build();
    }

    public WorkoutPlanResponse mapToResponse(WorkoutPlan workoutPlan) {
        return WorkoutPlanResponse.builder()
                .id(workoutPlan.getId())
                .name(workoutPlan.getName())
                .description(workoutPlan.getDescription())
                .level(workoutPlan.getLevel())
                .userId(workoutPlan.getUser().getId())
                .createdAt(workoutPlan.getCreatedAt())
                .updatedAt(workoutPlan.getUpdatedAt())
                .days(workoutPlan.getWorkoutDays()
                        .stream()
                        .map(WorkoutDayResponse::new)
                        .collect(Collectors.toList()))
                .build();
    }

    public WorkoutPlanResponse updateWorkoutPlan(Long id, WorkoutPlanRequest request) {
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout plan not found"));
                
        updateWorkoutPlanFields(workoutPlan, request);
        
        WorkoutPlan updatedPlan = workoutPlanRepository.save(workoutPlan);
        
        return mapToResponse(updatedPlan);
    }
    
    public void updateWorkoutPlanFields(WorkoutPlan workoutPlan, WorkoutPlanRequest request) {
        workoutPlan.setName(request.getName());
        workoutPlan.setDescription(request.getDescription());
        workoutPlan.setLevel(request.getLevel());
    }

    public Optional<WorkoutPlanResponse> getWorkoutPlanById(Long id) {
        return workoutPlanRepository.findById(id)
                .map(this::mapToResponse);
    }

    public void deleteWorkoutPlan(Long id) {
        if (!workoutPlanRepository.existsById(id)) {
            throw new RuntimeException("Workout plan not found");
        }
        workoutPlanRepository.deleteById(id);
    }
}

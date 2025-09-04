package com.help.gym.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import com.help.gym.repository.WorkoutDayRepository;
import com.help.gym.repository.WorkoutPlanRepository;
import com.help.gym.model.WorkoutDay;
import com.help.gym.model.WorkoutPlan;
import com.help.gym.dto.WorkoutDayRequest;
import com.help.gym.dto.WorkoutDayResponse;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkoutDayService {
    
    private final WorkoutDayRepository workoutDayRepository;
    private final WorkoutPlanRepository workoutPlanRepository;

    public List<WorkoutDayResponse> findAll() {
        return workoutDayRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public Optional<WorkoutDayResponse> findById(Long id) {
        return workoutDayRepository.findById(id)
                .map(this::mapToResponse);
    }

    public List<WorkoutDayResponse> findByWorkoutPlanId(Long workoutPlanId) {
        return workoutDayRepository.findByWorkoutPlanId(workoutPlanId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public WorkoutDayResponse createWorkoutDay(WorkoutDayRequest request) {
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(request.getWorkoutPlanId())
                .orElseThrow(() -> new RuntimeException("WorkoutPlan not found with id: " + request.getWorkoutPlanId()));

        WorkoutDay workoutDay = mapToEntity(request);
        workoutDay.setWorkoutPlan(workoutPlan);
        
        WorkoutDay savedWorkoutDay = workoutDayRepository.save(workoutDay);
        return mapToResponse(savedWorkoutDay);
    }
    
    
    public WorkoutDay mapToEntity(WorkoutDayRequest request) {
        return WorkoutDay.builder()
                .name(request.getName())
                .description(request.getDescription())
                .dayOrder(request.getDayOrder())
                .build();
    }
    
    public WorkoutDayResponse mapToResponse(WorkoutDay workoutDay) {
        return WorkoutDayResponse.builder()
                .id(workoutDay.getId())
                .name(workoutDay.getName())
                .description(workoutDay.getDescription())
                .dayOrder(workoutDay.getDayOrder())
                .workoutPlanId(workoutDay.getWorkoutPlan().getId())
                .build();
    }

    public Optional<WorkoutDayResponse> updateWorkoutDay(Long id, WorkoutDayRequest request) {
        return workoutDayRepository.findById(id)
                .map(workoutDay -> {
                    workoutDay.setName(request.getName());
                    workoutDay.setDescription(request.getDescription());
                    workoutDay.setDayOrder(request.getDayOrder());
                    WorkoutDay savedWorkoutDay = workoutDayRepository.save(workoutDay);
                    return mapToResponse(savedWorkoutDay);
                });
    }

    public boolean deleteWorkoutDay(Long id) {
        if (workoutDayRepository.existsById(id)) {
            workoutDayRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

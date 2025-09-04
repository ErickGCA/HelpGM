package com.help.gym.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.help.gym.dto.WorkoutPlanRequest;
import com.help.gym.dto.WorkoutPlanResponse;
import com.help.gym.service.WorkoutPlanService;

import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/workout-plans")
@RequiredArgsConstructor
public class WorkoutPlanController {
    
    private final WorkoutPlanService workoutPlanService;

    @GetMapping
    public ResponseEntity<List<WorkoutPlanResponse>> getAllWorkoutPlans() {
        List<WorkoutPlanResponse> workoutPlans = workoutPlanService.findAll();
        return ResponseEntity.ok(workoutPlans);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutPlanResponse> getWorkoutPlanById(@PathVariable Long id) {
        return workoutPlanService.getWorkoutPlanById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorkoutPlanResponse> createWorkoutPlan(@RequestBody WorkoutPlanRequest request) {
        // TODO: Obter userId do contexto de segurança (Spring Security)
        Long userId = 1L; // Temporário - deve vir do Authentication/Principal TODO: Remover
        
        WorkoutPlanResponse savedPlan = workoutPlanService.createWorkoutPlan(request, userId);
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedPlan.getId())
                .toUri();
                
        return ResponseEntity.created(location).body(savedPlan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutPlanResponse> updateWorkoutPlan(@PathVariable Long id, @RequestBody WorkoutPlanRequest request) {
        WorkoutPlanResponse updatedWorkoutPlan = workoutPlanService.updateWorkoutPlan(id, request);
        return ResponseEntity.ok(updatedWorkoutPlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkoutPlan(@PathVariable Long id) {
        workoutPlanService.deleteWorkoutPlan(id);
        return ResponseEntity.ok().build();
    }


}

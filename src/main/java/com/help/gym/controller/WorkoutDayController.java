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

import com.help.gym.dto.WorkoutDayRequest;
import com.help.gym.dto.WorkoutDayResponse;
import com.help.gym.dto.MessageResponse;
import com.help.gym.service.WorkoutDayService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/workout-days")
@RequiredArgsConstructor
public class WorkoutDayController {
    
    private final WorkoutDayService workoutDayService;

    @GetMapping
    public ResponseEntity<List<WorkoutDayResponse>> getAllWorkoutDays() {
        List<WorkoutDayResponse> workoutDays = workoutDayService.findAll();
        return ResponseEntity.ok(workoutDays);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutDayResponse> getWorkoutDayById(@PathVariable Long id) {
        return workoutDayService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorkoutDayResponse> createWorkoutDay(@Valid @RequestBody WorkoutDayRequest request) {
        WorkoutDayResponse savedWorkoutDay = workoutDayService.createWorkoutDay(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedWorkoutDay.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedWorkoutDay);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutDayResponse> updateWorkoutDay(@PathVariable Long id, @Valid @RequestBody WorkoutDayRequest request) {
        return workoutDayService.updateWorkoutDay(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteWorkoutDay(@PathVariable Long id) {
        boolean deleted = workoutDayService.deleteWorkoutDay(id);
        if (deleted) {
            MessageResponse response = MessageResponse.builder()
                    .message("Dia de treino deletado com sucesso")
                    .timestamp(java.time.LocalDateTime.now().toString())
                    .build();
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}

package com.help.gym.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.help.gym.dto.ExerciseRequest;
import com.help.gym.dto.ExerciseResponse;
import com.help.gym.dto.MessageResponse;
import com.help.gym.service.ExerciseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.net.URI;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
public class ExerciseController {
    
    private final ExerciseService exerciseService;

    @GetMapping
    public ResponseEntity<List<ExerciseResponse>> getAllExercises() {
        List<ExerciseResponse> exercises = exerciseService.getAllExercises();
        return ResponseEntity.ok(exercises);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseResponse> getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ExerciseResponse> createExercise(@Valid @RequestBody ExerciseRequest request) {
        ExerciseResponse savedExercise = exerciseService.createExercise(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedExercise.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedExercise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExerciseResponse> updateExercise(@PathVariable Long id, @Valid @RequestBody ExerciseRequest request) {
        return exerciseService.updateExercise(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteExercise(@PathVariable Long id) {
        boolean deleted = exerciseService.deleteExercise(id);
        if (deleted) {
            MessageResponse response = MessageResponse.builder()
                    .message("Exercício deletado com sucesso")
                    .timestamp(java.time.LocalDateTime.now().toString())
                    .build();
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}

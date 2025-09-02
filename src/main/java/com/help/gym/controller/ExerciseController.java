package com.help.gym.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.help.gym.model.Exercise;
import com.help.gym.repository.ExerciseRepository;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
    
    private final ExerciseRepository exerciseRepository;


    public ExerciseController(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @GetMapping
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) {
        Optional<Exercise> exercise = exerciseRepository.findById(id);
        return exercise.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Exercise> createExercise(@Valid @RequestBody Exercise exercise) {
        Exercise savedExercise = exerciseRepository.save(exercise);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(savedExercise.getId())
        .toUri();
        return ResponseEntity.created(location).body(savedExercise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @Valid @RequestBody Exercise exercise) {
        Optional<Exercise> existingExercise = exerciseRepository.findById(id);
        if (existingExercise.isPresent()) {
            Exercise updatedExercise = existingExercise.get();
            updatedExercise.setName(exercise.getName());
            updatedExercise.setDescription(exercise.getDescription());
            updatedExercise.setExerciseType(exercise.getExerciseType());
            updatedExercise.setMuscleGroup(exercise.getMuscleGroup());
            updatedExercise.setDifficulty(exercise.getDifficulty());
            updatedExercise.setEquipment(exercise.getEquipment());
            updatedExercise.setInstructions(exercise.getInstructions());
            updatedExercise.setTips(exercise.getTips());
            updatedExercise.setVariations(exercise.getVariations());

            Exercise savedExercise = exerciseRepository.save(updatedExercise);
            return ResponseEntity.ok(savedExercise);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteExercise(@PathVariable Long id) {
        return exerciseRepository.findById(id)
        .map(exercise -> {
            exerciseRepository.delete(exercise);
            return ResponseEntity.ok("Exercício deletado com sucesso");
        })
        .orElse(ResponseEntity.notFound().build());
    }
}

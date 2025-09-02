package com.help.gym.security.service;

import com.help.gym.model.Exercise;
import com.help.gym.repository.ExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public Exercise createExercise(Exercise exercise) {
        exerciseRepository.findByName(exercise.getName())
            .ifPresent(e -> { throw new RuntimeException("Exercício já existe"); });
        return exerciseRepository.save(exercise);
    }

    public Exercise updateExercise(Long id, Exercise exercise) {
        Exercise existingExercise = exerciseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Exercício não encontrado"));
        
        existingExercise.setName(exercise.getName());
        existingExercise.setDescription(exercise.getDescription());
        existingExercise.setExerciseType(exercise.getExerciseType());
        existingExercise.setMuscleGroup(exercise.getMuscleGroup());
        existingExercise.setDifficulty(exercise.getDifficulty());
        existingExercise.setEquipment(exercise.getEquipment());
        existingExercise.setInstructions(exercise.getInstructions());
        existingExercise.setTips(exercise.getTips());
        existingExercise.setVariations(exercise.getVariations());

        return exerciseRepository.save(existingExercise);
    }

    public void deleteExercise(Long id) {
        Exercise existingExercise = exerciseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Exercício não encontrado"));
        exerciseRepository.delete(existingExercise);
    }

    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Exercício não encontrado"));
    }

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }
}

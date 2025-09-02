package com.help.gym.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.help.gym.dto.ExerciseRequest;
import com.help.gym.dto.ExerciseResponse;
import com.help.gym.model.Exercise;
import com.help.gym.repository.ExerciseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ExerciseService {
    
    private final ExerciseRepository exerciseRepository;
    
    public List<ExerciseResponse> getAllExercises() {
        return exerciseRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public Optional<ExerciseResponse> getExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .map(this::mapToResponse);
    }
    
    public ExerciseResponse createExercise(ExerciseRequest request) {
        Exercise exercise = mapToEntity(request);
        Exercise savedExercise = exerciseRepository.save(exercise);
        return mapToResponse(savedExercise);
    }
    
    public Optional<ExerciseResponse> updateExercise(Long id, ExerciseRequest request) {
        return exerciseRepository.findById(id)
                .map(existingExercise -> {
                    updateExerciseFields(existingExercise, request);
                    Exercise savedExercise = exerciseRepository.save(existingExercise);
                    return mapToResponse(savedExercise);
                });
    }
    
    public boolean deleteExercise(Long id) {
        return exerciseRepository.findById(id)
                .map(exercise -> {
                    exerciseRepository.delete(exercise);
                    return true;
                })
                .orElse(false);
    }
    
    private Exercise mapToEntity(ExerciseRequest request) {
        return Exercise.builder()
                .name(request.getName())
                .description(request.getDescription())
                .image(request.getImage())
                .video(request.getVideo())
                .exerciseType(request.getExerciseType())
                .muscleGroup(request.getMuscleGroup())
                .difficulty(request.getDifficulty())
                .equipment(request.getEquipment())
                .instructions(request.getInstructions())
                .tips(request.getTips())
                .variations(request.getVariations())
                .build();
    }
    
    private ExerciseResponse mapToResponse(Exercise exercise) {
        return ExerciseResponse.builder()
                .id(exercise.getId())
                .name(exercise.getName())
                .description(exercise.getDescription())
                .image(exercise.getImage())
                .video(exercise.getVideo())
                .exerciseType(exercise.getExerciseType())
                .muscleGroup(exercise.getMuscleGroup())
                .difficulty(exercise.getDifficulty())
                .equipment(exercise.getEquipment())
                .instructions(exercise.getInstructions())
                .tips(exercise.getTips())
                .variations(exercise.getVariations())
                .build();
    }
    
    private void updateExerciseFields(Exercise exercise, ExerciseRequest request) {
        exercise.setName(request.getName());
        exercise.setDescription(request.getDescription());
        exercise.setImage(request.getImage());
        exercise.setVideo(request.getVideo());
        exercise.setExerciseType(request.getExerciseType());
        exercise.setMuscleGroup(request.getMuscleGroup());
        exercise.setDifficulty(request.getDifficulty());
        exercise.setEquipment(request.getEquipment());
        exercise.setInstructions(request.getInstructions());
        exercise.setTips(request.getTips());
        exercise.setVariations(request.getVariations());
    }
}

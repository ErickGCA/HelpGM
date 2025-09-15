package com.help.gym.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import com.help.gym.repository.WorkoutDayExerciseRepository;
import com.help.gym.repository.WorkoutDayRepository;
import com.help.gym.repository.ExerciseRepository;
import com.help.gym.model.WorkoutDayExercise;
import com.help.gym.model.WorkoutDay;
import com.help.gym.model.Exercise;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.help.gym.dto.WorkoutDayExerciseRequest;
import com.help.gym.dto.WorkoutDayExerciseResponse;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkoutDayExerciseService {

    private final WorkoutDayExerciseRepository workoutDayExerciseRepository;
    private final WorkoutDayRepository workoutDayRepository;
    private final ExerciseRepository exerciseRepository;

    public List<WorkoutDayExerciseResponse> findByWorkoutDayId(Long workoutDayId) {
        return workoutDayExerciseRepository.findByWorkoutDayIdOrderByOrderAsc(workoutDayId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public WorkoutDayExerciseResponse createWorkoutDayExercise(WorkoutDayExerciseRequest request) {
        WorkoutDayExercise workoutDayExercise = mapToEntity(request);
        WorkoutDayExercise savedWorkoutDayExercise = workoutDayExerciseRepository.save(workoutDayExercise);
        return mapToResponse(savedWorkoutDayExercise);
    }

    public Optional<WorkoutDayExerciseResponse> findById(Long id) {
        return workoutDayExerciseRepository.findById(id)
                .map(this::mapToResponse);
    }

    public WorkoutDayExerciseResponse mapToResponse(WorkoutDayExercise workoutDayExercise) {
        return WorkoutDayExerciseResponse.builder()
                .id(workoutDayExercise.getId())
                .workoutDayId(workoutDayExercise.getWorkoutDay().getId())
                .exerciseId(workoutDayExercise.getExercise().getId())
                .sets(workoutDayExercise.getSets())
                .reps(workoutDayExercise.getReps())
                .weight(workoutDayExercise.getWeight())
                .restTime(workoutDayExercise.getRestTime())
                .order(workoutDayExercise.getOrder())
                .notes(workoutDayExercise.getNotes())
                .workoutDay(workoutDayExercise.getWorkoutDay())
                .exercise(workoutDayExercise.getExercise())
                .build();
    }

    public WorkoutDayExercise mapToEntity(WorkoutDayExerciseRequest request) {
        WorkoutDay workoutDay = workoutDayRepository.findById(request.getWorkoutDayId())
                .orElseThrow(() -> new RuntimeException("WorkoutDay não encontrado com ID: " + request.getWorkoutDayId()));
        
        Exercise exercise = exerciseRepository.findById(request.getExerciseId())
                .orElseThrow(() -> new RuntimeException("Exercise não encontrado com ID: " + request.getExerciseId()));

        return WorkoutDayExercise.builder()
                .workoutDay(workoutDay)
                .exercise(exercise)
                .sets(request.getSets())
                .reps(request.getReps())
                .weight(request.getWeight())
                .restTime(request.getRestTime())
                .order(request.getOrder())
                .notes(request.getNotes())
                .build();
    }

    public boolean deleteWorkoutDayExercise(Long id) {
        if (workoutDayExerciseRepository.existsById(id)) {
            workoutDayExerciseRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<WorkoutDayExerciseResponse> updateWorkoutDayExercise(Long id, WorkoutDayExerciseRequest request) {
        return workoutDayExerciseRepository.findById(id)
                .map(workoutDayExercise -> {
                    updateWorkoutDayExerciseFields(workoutDayExercise, request);
                    WorkoutDayExercise savedWorkoutDayExercise = workoutDayExerciseRepository.save(workoutDayExercise);
                    return mapToResponse(savedWorkoutDayExercise);
                });
    }

    private void updateWorkoutDayExerciseFields(WorkoutDayExercise workoutDayExercise, WorkoutDayExerciseRequest request) {
        if (request.getSets() != null) {
            workoutDayExercise.setSets(request.getSets());
        }
        if (request.getReps() != null) {
            workoutDayExercise.setReps(request.getReps());
        }
        if (request.getWeight() != null) {
            workoutDayExercise.setWeight(request.getWeight());
        }
        if (request.getRestTime() != null) {
            workoutDayExercise.setRestTime(request.getRestTime());
        }
        if (request.getOrder() != null) {
            workoutDayExercise.setOrder(request.getOrder());
        }
        if (request.getNotes() != null) {
            workoutDayExercise.setNotes(request.getNotes());
        }
        
        if (request.getWorkoutDayId() != null) {
            WorkoutDay workoutDay = workoutDayRepository.findById(request.getWorkoutDayId())
                    .orElseThrow(() -> new RuntimeException("WorkoutDay não encontrado com ID: " + request.getWorkoutDayId()));
            workoutDayExercise.setWorkoutDay(workoutDay);
        }
        
        if (request.getExerciseId() != null) {
            Exercise exercise = exerciseRepository.findById(request.getExerciseId())
                    .orElseThrow(() -> new RuntimeException("Exercise não encontrado com ID: " + request.getExerciseId()));
            workoutDayExercise.setExercise(exercise);
        }
    }
}

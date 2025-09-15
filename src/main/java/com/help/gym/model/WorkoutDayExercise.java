package com.help.gym.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "workout_day_exercises")
public class WorkoutDayExercise {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "workout_day_id", nullable = false)
    private WorkoutDay workoutDay;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(nullable = false)
    private Integer sets;

    @Column(nullable = false)
    private Integer reps;

    @Column(nullable = false)
    private Integer weight;

    @Column(nullable = false)
    private Integer restTime;

    @Column(nullable = false)
    private Integer order;
    
    @Column(columnDefinition = "text")
    private String notes;

    // Campos auxiliares para facilitar o mapeamento
    @Transient
    private Long workoutDayId;
    
    @Transient
    private Long exerciseId;
}

package com.help.gym.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exercises")

public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do exercício é obrigatório")
    @Size(min = 3, max = 20, message = "O nome do exercício deve ter entre 3 e 20 caracteres")
    @Column(nullable = false, unique = true)
    private String name;

    @NotBlank(message = "A descrição do exercício é obrigatória")
    @Size(min = 3, max = 200, message = "A descrição do exercício deve ter entre 3 e 200 caracteres")
    @Column(nullable = false)
    private String description;

    private String image;

    private String video;

    public enum ExerciseType {
        STRENGTH,
        CARDIO,
        BALANCE,
        FLEXIBILITY,
        REHABILITATION
    }
    @Enumerated(EnumType.STRING)
    private ExerciseType exerciseType;

    public enum MuscleGroup {
        CHEST,
        BACK,
        SHOULDERS,
        ARMS,
        LEGS,
        ABS
    }
    @Enumerated(EnumType.STRING)
    private MuscleGroup muscleGroup;

    public enum Difficulty {
        BEGINNER,
        INTERMEDIATE,
        ADVANCED
    }

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private String equipment;

    @Column(columnDefinition = "text")
    private String instructions;

    @Column(columnDefinition = "text")
    private String tips;

    @Column(columnDefinition = "text")
    private String variations;
}

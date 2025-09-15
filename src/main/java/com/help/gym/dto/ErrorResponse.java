package com.help.gym.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Resposta de erro padrão da API")
public class ErrorResponse {
    
    @Schema(description = "Código de status HTTP", example = "400")
    private int status;
    
    @Schema(description = "Mensagem de erro", example = "Dados inválidos")
    private String message;
    
    @Schema(description = "Detalhes específicos do erro", example = "Campo 'email' é obrigatório")
    private String details;
    
    @Schema(description = "Timestamp do erro", example = "2024-01-15T10:30:00")
    private LocalDateTime timestamp;
    
    @Schema(description = "Caminho da requisição que causou o erro", example = "/api/auth/login")
    private String path;
    
    public static ErrorResponse of(int status, String message, String path) {
        return ErrorResponse.builder()
                .status(status)
                .message(message)
                .timestamp(LocalDateTime.now())
                .path(path)
                .build();
    }
    
    public static ErrorResponse of(int status, String message, String details, String path) {
        return ErrorResponse.builder()
                .status(status)
                .message(message)
                .details(details)
                .timestamp(LocalDateTime.now())
                .path(path)
                .build();
    }
}

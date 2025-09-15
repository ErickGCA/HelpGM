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
@Schema(description = "Resposta de sucesso padrão da API")
public class SuccessResponse {
    
    @Schema(description = "Código de status HTTP", example = "200")
    private int status;
    
    @Schema(description = "Mensagem de sucesso", example = "Operação realizada com sucesso")
    private String message;
    
    @Schema(description = "Dados retornados pela operação")
    private Object data;
    
    @Schema(description = "Timestamp da resposta", example = "2024-01-15T10:30:00")
    private LocalDateTime timestamp;
    
    public static SuccessResponse of(String message, Object data) {
        return SuccessResponse.builder()
                .status(200)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }
    
    public static SuccessResponse of(String message) {
        return SuccessResponse.builder()
                .status(200)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }
}

package com.help.gym.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new io.swagger.v3.oas.models.info.Info()
                        .title("HelpGM API")
                        .description("API para sistema de gerenciamento de academia")
                        .version("1.0.0")
                        .contact(new io.swagger.v3.oas.models.info.Contact()
                                .name("Equipe HelpGM")
                                .email("contato@helpgm.com")
                                .url("https://helpgm.com"))
                        .license(new io.swagger.v3.oas.models.info.License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication", 
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Insira o token JWT no formato: Bearer {token}"))
                        .addResponses("BadRequest", createErrorResponse(400, "Dados inválidos"))
                        .addResponses("Unauthorized", createErrorResponse(401, "Não autorizado"))
                        .addResponses("Forbidden", createErrorResponse(403, "Acesso negado"))
                        .addResponses("NotFound", createErrorResponse(404, "Recurso não encontrado"))
                        .addResponses("InternalServerError", createErrorResponse(500, "Erro interno do servidor"))
                        .addResponses("Success", createSuccessResponse(200, "Operação realizada com sucesso")));
    }
    
    private ApiResponse createErrorResponse(int statusCode, String description) {
        return new ApiResponse()
                .description(description)
                .content(new Content()
                        .addMediaType("application/json", new MediaType()
                                .schema(new Schema<>().$ref("#/components/schemas/ErrorResponse"))));
    }
    
    private ApiResponse createSuccessResponse(int statusCode, String description) {
        return new ApiResponse()
                .description(description)
                .content(new Content()
                        .addMediaType("application/json", new MediaType()
                                .schema(new Schema<>().$ref("#/components/schemas/SuccessResponse"))));
    }
}

package com.help.gym.config;

public class SwaggerExamples {
    
    public static final String BAD_REQUEST_ERROR = "{\n" +
            "  \"status\": 400,\n" +
            "  \"message\": \"Dados inválidos\",\n" +
            "  \"details\": \"Campo 'email' é obrigatório\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/auth/login\"\n" +
            "}";
    
    public static final String UNAUTHORIZED_ERROR = "{\n" +
            "  \"status\": 401,\n" +
            "  \"message\": \"Credenciais inválidas\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/auth/login\"\n" +
            "}";
    
    public static final String FORBIDDEN_ERROR = "{\n" +
            "  \"status\": 403,\n" +
            "  \"message\": \"Acesso negado\",\n" +
            "  \"details\": \"Token JWT inválido ou expirado\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/exercises\"\n" +
            "}";
    
    public static final String NOT_FOUND_ERROR = "{\n" +
            "  \"status\": 404,\n" +
            "  \"message\": \"Recurso não encontrado\",\n" +
            "  \"details\": \"Usuário com ID 123 não existe\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/users/123\"\n" +
            "}";
    
    public static final String INTERNAL_SERVER_ERROR = "{\n" +
            "  \"status\": 500,\n" +
            "  \"message\": \"Erro interno do servidor\",\n" +
            "  \"details\": \"Erro inesperado no banco de dados\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/auth/login\"\n" +
            "}";
    
    public static final String SUCCESS_RESPONSE = "{\n" +
            "  \"status\": 200,\n" +
            "  \"message\": \"Operação realizada com sucesso\",\n" +
            "  \"data\": {},\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\"\n" +
            "}";
    
    public static final String LOGIN_SUCCESS = "{\n" +
            "  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\n" +
            "  \"refreshToken\": \"refresh_token_aqui\"\n" +
            "}";
    
    public static final String REGISTER_SUCCESS = "{\n" +
            "  \"status\": 200,\n" +
            "  \"message\": \"Usuário registrado com sucesso!\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\"\n" +
            "}";
    
    public static final String VALIDATION_ERROR = "{\n" +
            "  \"status\": 400,\n" +
            "  \"message\": \"Dados inválidos\",\n" +
            "  \"details\": \"Username já está em uso\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/auth/register\"\n" +
            "}";
    
    public static final String USER_NOT_FOUND_ERROR = "{\n" +
            "  \"status\": 400,\n" +
            "  \"message\": \"Usuário não encontrado\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/auth/login\"\n" +
            "}";
    
    public static final String WRONG_PASSWORD_ERROR = "{\n" +
            "  \"status\": 400,\n" +
            "  \"message\": \"Senha incorreta\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/auth/login\"\n" +
            "}";
    
    public static final String USERNAME_IN_USE_ERROR = "{\n" +
            "  \"status\": 400,\n" +
            "  \"message\": \"Nome de usuário já está em uso!\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/auth/register\"\n" +
            "}";
    
    public static final String EMAIL_IN_USE_ERROR = "{\n" +
            "  \"status\": 400,\n" +
            "  \"message\": \"Email já está em uso!\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/auth/register\"\n" +
            "}";
    
    public static final String REFRESH_TOKEN_INVALID_ERROR = "{\n" +
            "  \"status\": 400,\n" +
            "  \"message\": \"Refresh token não encontrado no banco de dados.\",\n" +
            "  \"timestamp\": \"2024-01-15T10:30:00\",\n" +
            "  \"path\": \"/api/auth/refresh\"\n" +
            "}";
}

package com.help.gym.controller;

import com.help.gym.dto.JwtResponse;
import com.help.gym.dto.LoginRequest;
import com.help.gym.dto.RefreshTokenRequest;
import com.help.gym.dto.RegisterRequest;
import com.help.gym.exception.TokenRefreshException;
import com.help.gym.model.Role;
import com.help.gym.model.User;
import com.help.gym.repository.UserRepository;
import com.help.gym.security.service.JwtService;
import com.help.gym.security.service.RefreshTokenService;
import com.help.gym.config.SwaggerExamples;
import com.help.gym.dto.ErrorResponse;
import com.help.gym.dto.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticação", description = "Endpoints para autenticação e registro de usuários")
public class AuthController {

    @Autowired AuthenticationManager authenticationManager;
    @Autowired UserRepository userRepository;
    @Autowired PasswordEncoder passwordEncoder;
    @Autowired JwtService jwtService;
    @Autowired RefreshTokenService refreshTokenService;

    @Operation(
        summary = "Fazer login",
        description = "Autentica um usuário e retorna um token JWT e refresh token"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Login realizado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = JwtResponse.class),
                examples = @ExampleObject(
                    name = "Sucesso",
                    value = SwaggerExamples.LOGIN_SUCCESS
                )
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Credenciais inválidas",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ErrorResponse.class),
                examples = @ExampleObject(
                    name = "Usuário não encontrado",
                    value = SwaggerExamples.USER_NOT_FOUND_ERROR
                )
            )
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Erro interno do servidor",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ErrorResponse.class),
                examples = @ExampleObject(
                    name = "Erro interno",
                    value = SwaggerExamples.INTERNAL_SERVER_ERROR
                )
            )
        )
    })
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Tentativa de login para usuário: " + loginRequest.getUsername());
            
            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElse(null);
            if (user == null) {
                System.out.println("Usuário não encontrado: " + loginRequest.getUsername());
                ErrorResponse errorResponse = ErrorResponse.of(400, "Usuário não encontrado", "/api/auth/login");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            System.out.println("Usuário encontrado, verificando senha...");
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            User authenticatedUser = (User) authentication.getPrincipal();

            System.out.println("Autenticação bem-sucedida para: " + authenticatedUser.getUsername());

            String jwt = jwtService.generateToken(authenticatedUser);
            String refreshToken = refreshTokenService.createRefreshToken(authenticatedUser.getUsername()).getToken();

            return ResponseEntity.ok(new JwtResponse(jwt, refreshToken));
        } catch (BadCredentialsException e) {
            System.out.println("Credenciais inválidas para usuário: " + loginRequest.getUsername());
            ErrorResponse errorResponse = ErrorResponse.of(400, "Senha incorreta", "/api/auth/login");
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {
            System.out.println("Erro durante login: " + e.getMessage());
            e.printStackTrace();
            ErrorResponse errorResponse = ErrorResponse.of(500, "Erro interno do servidor: " + e.getMessage(), "/api/auth/login");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @Operation(
        summary = "Registrar usuário",
        description = "Cria uma nova conta de usuário no sistema"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Usuário registrado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = SuccessResponse.class),
                examples = @ExampleObject(
                    name = "Sucesso",
                    value = SwaggerExamples.REGISTER_SUCCESS
                )
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Dados inválidos ou usuário já existe",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ErrorResponse.class),
                examples = @ExampleObject(
                    name = "Username em uso",
                    value = SwaggerExamples.USERNAME_IN_USE_ERROR
                )
            )
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Erro interno do servidor",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ErrorResponse.class),
                examples = @ExampleObject(
                    name = "Erro interno",
                    value = SwaggerExamples.INTERNAL_SERVER_ERROR
                )
            )
        )
    })
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
                ErrorResponse errorResponse = ErrorResponse.of(400, "Nome de usuário já está em uso!", "/api/auth/register");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
                ErrorResponse errorResponse = ErrorResponse.of(400, "Email já está em uso!", "/api/auth/register");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            User user = User.builder()
                    .username(registerRequest.getUsername())
                    .email(registerRequest.getEmail())
                    .password(passwordEncoder.encode(registerRequest.getPassword()))
                    .role(Role.USER)
                    .build();

            userRepository.save(user);
            
            SuccessResponse successResponse = SuccessResponse.of("Usuário registrado com sucesso!");
            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = ErrorResponse.of(500, "Erro interno do servidor", "/api/auth/register");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
    
    @Operation(
        summary = "Renovar token",
        description = "Renova o token JWT usando um refresh token válido"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Token renovado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = JwtResponse.class),
                examples = @ExampleObject(
                    name = "Sucesso",
                    value = SwaggerExamples.LOGIN_SUCCESS
                )
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Refresh token inválido ou expirado",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ErrorResponse.class),
                examples = @ExampleObject(
                    name = "Token inválido",
                    value = SwaggerExamples.REFRESH_TOKEN_INVALID_ERROR
                )
            )
        )
    })
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        try {
            String requestRefreshToken = request.getRefreshToken();

            return refreshTokenService.findByToken(requestRefreshToken)
                    .map(refreshTokenService::verifyExpiration)
                    .map(refreshToken -> {
                        User user = refreshToken.getUser();
                        String token = jwtService.generateToken(user);
                        return ResponseEntity.ok(new JwtResponse(token, requestRefreshToken));
                    })
                    .orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "Refresh token não encontrado no banco de dados."));
        } catch (TokenRefreshException e) {
            ErrorResponse errorResponse = ErrorResponse.of(400, e.getMessage(), "/api/auth/refresh");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
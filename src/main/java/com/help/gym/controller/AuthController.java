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

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired AuthenticationManager authenticationManager;
    @Autowired UserRepository userRepository;
    @Autowired PasswordEncoder passwordEncoder;
    @Autowired JwtService jwtService;
    @Autowired RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Tentativa de login para usuário: " + loginRequest.getUsername());
            
            // Verificar se o usuário existe
            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElse(null);
            
            if (user == null) {
                System.out.println("Usuário não encontrado: " + loginRequest.getUsername());
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Usuário não encontrado");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            System.out.println("Usuário encontrado, verificando senha...");
            
            // Tentar autenticar
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
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Senha incorreta");
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {
            System.out.println("Erro durante login: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erro interno do servidor: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Nome de usuário já está em uso!");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Email já está em uso!");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            User user = User.builder()
                    .username(registerRequest.getUsername())
                    .email(registerRequest.getEmail())
                    .password(passwordEncoder.encode(registerRequest.getPassword()))
                    .role(Role.USER)
                    .build();

            userRepository.save(user);
            
            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("message", "Usuário registrado com sucesso!");
            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erro interno do servidor");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
    
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
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
package com.help.gym.security.service;

import com.help.gym.exception.TokenRefreshException;
import com.help.gym.model.RefreshToken;
import com.help.gym.model.User;
import com.help.gym.repository.RefreshTokenRepository;
import com.help.gym.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Value("${jwt.expiration.refresh-ms}")
    private Long refreshTokenDurationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Transactional
    public RefreshToken createRefreshToken(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        try {
            refreshTokenRepository.deleteByUser(user);
            refreshTokenRepository.flush();
        } catch (Exception e) {
            System.out.println("Erro ao deletar tokens antigos: " + e.getMessage());
            List<RefreshToken> existingTokens = refreshTokenRepository.findAll().stream()
                    .filter(token -> token.getUser().getId().equals(user.getId()))
                    .toList();
            
            for (RefreshToken token : existingTokens) {
                refreshTokenRepository.delete(token);
            }
            refreshTokenRepository.flush();
        }
        
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .expiryDate(Instant.now().plusMillis(refreshTokenDurationMs))
                .token(UUID.randomUUID().toString())
                .build();
        
        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token expirado. Por favor, faça login novamente.");
        }
        return token;
    }
}
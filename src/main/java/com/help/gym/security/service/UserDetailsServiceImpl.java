package com.help.gym.security.service;

import com.help.gym.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("UserDetailsService: Carregando usuário: " + username);
        
        try {
            UserDetails user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
            
            System.out.println("UserDetailsService: Usuário carregado com sucesso: " + username);
            System.out.println("UserDetailsService: Authorities: " + user.getAuthorities());
            
            return user;
        } catch (Exception e) {
            System.out.println("UserDetailsService: Erro ao carregar usuário " + username + ": " + e.getMessage());
            throw e;
        }
    }
}
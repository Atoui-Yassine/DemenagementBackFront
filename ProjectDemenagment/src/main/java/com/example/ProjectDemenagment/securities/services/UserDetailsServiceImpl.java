package com.example.ProjectDemenagment.securities.services;

import com.example.ProjectDemenagment.models.UserModel;
import com.example.ProjectDemenagment.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user=userRepository.findByEmail(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found with email "+username));

        return UserDetailsImpl.build(user);
    }

}

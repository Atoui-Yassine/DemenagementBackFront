package com.example.ProjectDemenagment.services;

import com.example.ProjectDemenagment.exceptions.EntityNotFoundException;
import com.example.ProjectDemenagment.models.ERole;
import com.example.ProjectDemenagment.models.Role;
import com.example.ProjectDemenagment.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role findRoleByName(ERole name){
        Role role=roleRepository.findRoleByName(name)
                .orElseThrow(()->new EntityNotFoundException("role not found with name :"+name));
        return role;
    }
}

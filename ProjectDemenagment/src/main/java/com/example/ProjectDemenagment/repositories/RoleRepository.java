package com.example.ProjectDemenagment.repositories;

import com.example.ProjectDemenagment.models.ERole;
import com.example.ProjectDemenagment.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {
    @Query("select r from Role r where r.name = ?1")
    Optional<Role> findRoleByName(ERole name);
}

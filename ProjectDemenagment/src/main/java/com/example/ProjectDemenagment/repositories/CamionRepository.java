package com.example.ProjectDemenagment.repositories;

import com.example.ProjectDemenagment.models.Camion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CamionRepository extends JpaRepository<Camion,Long> {
}

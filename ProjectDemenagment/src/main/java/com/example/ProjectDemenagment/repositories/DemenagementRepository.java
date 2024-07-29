package com.example.ProjectDemenagment.repositories;

import com.example.ProjectDemenagment.models.Demenagement;
import com.example.ProjectDemenagment.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemenagementRepository extends JpaRepository<Demenagement,Long> {

    @Query("select d from Demenagement d where d.client = ?1")
    List<Demenagement> findAllByClient(UserModel client);
    @Query("select d from Demenagement d where d.chauffeur = ?1")
    List<Demenagement> findAllByChauffeur(UserModel chauffeur);
}

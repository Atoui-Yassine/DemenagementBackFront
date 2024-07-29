package com.example.ProjectDemenagment.services;

import com.example.ProjectDemenagment.models.Camion;
import com.example.ProjectDemenagment.models.Demenagement;
import com.example.ProjectDemenagment.models.UserModel;
import com.example.ProjectDemenagment.repositories.CamionRepository;
import com.example.ProjectDemenagment.repositories.DemenagementRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CamionService {
    @Autowired
    private CamionRepository camionRepository;
   @Autowired
    private UserService userService;
   @Autowired
   private DemenagementRepository demenagementRepository;
    public Camion addCamion(Camion camion, UserModel admin) {
        camion.setAdminAdd(admin);
       return camionRepository.save(camion);
    }

    public List<Camion> AllCamion(){
        return camionRepository.findAll();
    }

    public Camion getById(Long id){
        Camion camion=camionRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Camion not Found with id :"+id));
        return camion;
    }
    public Long countCamion(){
        return camionRepository.count();
    }

    public void deleteById(Long camionId) {

        Camion camion = camionRepository.findById(camionId).orElseThrow(() -> new RuntimeException("Camion not found"));
        for (Demenagement demenagement : camion.getDemenagements()) {
            demenagement.setCamion(null);
            demenagementRepository.save(demenagement);
        }
        camionRepository.delete(camion);
    }
}

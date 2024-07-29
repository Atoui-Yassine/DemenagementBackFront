package com.example.ProjectDemenagment.services;

import com.example.ProjectDemenagment.DTOs.request.AssigneDemande;
import com.example.ProjectDemenagment.exceptions.BadRequestException;
import com.example.ProjectDemenagment.models.Camion;
import com.example.ProjectDemenagment.models.Demenagement;
import com.example.ProjectDemenagment.models.StautsDem;
import com.example.ProjectDemenagment.models.UserModel;
import com.example.ProjectDemenagment.repositories.DemenagementRepository;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@Service
public class DemenagementService {
    @Autowired
    private DemenagementRepository demenagementRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;
    @Autowired
    private CamionService camionService;
    public Demenagement createDemenagement(Demenagement demenagement, Principal principal){
        UserModel client=userService.findByEmail(principal.getName());
        Demenagement dem=Demenagement.builder()
                .date(demenagement.getDate())
                .startAddress(demenagement.getStartAddress())
                .endAddress(demenagement.getEndAddress())
                .furnitureCategory(demenagement.getFurnitureCategory())
                .status(StautsDem.PENDING)
                .client(client)
                .build();
        return demenagementRepository.save(dem) ;
    }
    public List<Demenagement> allDemenagementByClient(Principal principal){
        UserModel client=userService.findByEmail(principal.getName());
        return demenagementRepository.findAllByClient(client);
    }
    public Demenagement getById(Long id){
        Demenagement demenagement=demenagementRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Demenagement not found by Id : "+id));
    return demenagement;
    }
    public Demenagement changeStatus(Long reservationId,StautsDem status,Principal principal){
        if( !(userService.findByEmail(principal.getName()).equals(this.getById(reservationId).getClient()))){
            throw new BadRequestException(" Unauthorized exception ");
        }
        Demenagement deme=this.getById(reservationId);
        deme.setStatus(status);
        if(status.equals(StautsDem.CANCELED)){
            deme.setChauffeur(null);
            deme.setCamion(null);
        }
        return demenagementRepository.save(deme);
    }
    public Demenagement chaufeurCaheStatus(Long reservationId,StautsDem status,Principal principal) throws MessagingException, IOException {
        try {
            if(!(userService.findByEmail(principal.getName()).equals(this.getById(reservationId).getChauffeur()))){
                throw new BadRequestException(" Unauthorized exception ");
            }
            Demenagement deme=this.getById(reservationId);
            deme.setStatus(status);
            emailService.sendEmailNotifConfirmation(principal.getName(),deme.getClient().getEmail(),"Reponce of demande demenagement",deme.getDate(),deme.getClient().getFirstname(),status.toString());
            return demenagementRepository.save(deme);
        }catch (Exception e){
            throw new BadRequestException(" Unauthorized exception ");
        }



    }


    public List<Demenagement> allDemenagementByChauffeur(Principal principal){
            UserModel chauffeur=userService.findByEmail(principal.getName());
            return demenagementRepository.findAllByChauffeur(chauffeur);
    }
    public List<Demenagement> allDemenagement(){
        return demenagementRepository.findAll();
    }
    @Transactional
    public Demenagement assigneDemande(AssigneDemande assigneDemande){
        Demenagement demenagement=this.getById(assigneDemande.getReservationId());
        if(!(demenagement.getStatus().equals(StautsDem.PENDING))){
            throw new BadRequestException("Le déménagement doit être en attente pour être assigné");
        }

        UserModel chauffeur=userService.findById(assigneDemande.getDriverId());
        Camion camion=camionService.getById(assigneDemande.getCamionId());
        demenagement.setCamion(camion);
        demenagement.setChauffeur(chauffeur);
        return demenagementRepository.save(demenagement);

    }
    public void deleteById(Long id){
        demenagementRepository.deleteById(id);
    }
    public Long countDemenagement(){
        return demenagementRepository.count();
    }
}

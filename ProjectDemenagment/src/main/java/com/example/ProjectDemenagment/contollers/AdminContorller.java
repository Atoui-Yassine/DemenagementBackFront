package com.example.ProjectDemenagment.contollers;

import com.example.ProjectDemenagment.DTOs.request.AssigneDemande;
import com.example.ProjectDemenagment.DTOs.request.ChaffeurDTO;
import com.example.ProjectDemenagment.DTOs.request.ClientDTO;
import com.example.ProjectDemenagment.models.Camion;
import com.example.ProjectDemenagment.models.Demenagement;
import com.example.ProjectDemenagment.models.ERole;
import com.example.ProjectDemenagment.models.UserModel;
import com.example.ProjectDemenagment.services.CamionService;
import com.example.ProjectDemenagment.services.DemenagementService;
import com.example.ProjectDemenagment.services.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminContorller {
    @Autowired
    private CamionService camionService;
    @Autowired
    private UserService userService;
    @Autowired
    private DemenagementService demenagementService;
    @PostMapping("/vehicle")
    public ResponseEntity<?> addCamion(@RequestBody Camion camion, Principal principal){
        try {
            UserModel admin=userService.findByEmail(principal.getName());
            return new ResponseEntity<>(camionService.addCamion(camion,admin),HttpStatus.CREATED);
        }catch (RuntimeException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> response = new HashMap<>();
            response.put("error", errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

        }
    }
    @GetMapping("/camion")
    public  ResponseEntity<List<Camion>> AllCamion(){
        return new ResponseEntity<>(camionService.AllCamion(),HttpStatus.OK);
    }
    @PostMapping("/chauffeurs")
    public ResponseEntity<?> AddChauffeur(@RequestBody ChaffeurDTO chaffeurDTO,Principal principal) throws MessagingException, IOException {
        try {
            return new ResponseEntity<>(userService.AddChauffeur(chaffeurDTO,principal),HttpStatus.CREATED);
        }catch (RuntimeException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> response = new HashMap<>();
            response.put("error", errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);

        }

    }

    @GetMapping("/chauffeurs")
    public ResponseEntity<List<ChaffeurDTO>> getAllChauffeurs(){
        return new ResponseEntity<>(userService.getAllChaufeurs(),HttpStatus.OK);
    }
    @PutMapping("/assign")
    public  ResponseEntity<?> assigneDemande(@RequestBody AssigneDemande assigneDemande){
       try {
           Demenagement demenagement=demenagementService.assigneDemande(assigneDemande);
           return new ResponseEntity<>(demenagement,HttpStatus.OK);
       }catch (RuntimeException e) {
           String errorMessage = e.getMessage();
           Map<String, Object> response = new HashMap<>();
           response.put("error", errorMessage);
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

       }

    }
    @GetMapping("/chauffeur/{id}")
    public ResponseEntity<?> getChauffeurById(@PathVariable Long id){
        try {
            return new ResponseEntity<>(userService.findById(id),HttpStatus.OK);
        }catch (RuntimeException e) {
            String errorMessage = e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    @GetMapping("/clients")
    public ResponseEntity<List<ClientDTO>> getAllClients(){
        return new ResponseEntity<>(userService.getAllClient(),HttpStatus.OK);
    }

    @GetMapping("/demenagements")
    public  ResponseEntity<List<Demenagement>> getAllDemenagememnt(){
        return new ResponseEntity<>(demenagementService.allDemenagement(),HttpStatus.OK);
    }
    @DeleteMapping("/{chauffeurId}")
    public void deleteChauffeur(@PathVariable Long chauffeurId){
        userService.deleteChById(chauffeurId);
    }
    @DeleteMapping("/camion/{camionId}")
    public void deleteCamion(@PathVariable Long camionId){
        camionService.deleteById(camionId);
    }
    @DeleteMapping("/client/{clientId}")
    public void deleteClient(@PathVariable Long clientId){
         userService.deleteById(clientId);
    }
    @GetMapping("/chaufeur/count")
    public ResponseEntity<Long> getCountchauffeur(){
        return new ResponseEntity<>(userService.countUser(ERole.ROLE_CHAUFFEUR),HttpStatus.OK);
    }
    @GetMapping("/client/count")
    public ResponseEntity<Long> getCountclient(){
        return new ResponseEntity<>(userService.countUser(ERole.ROLE_USER),HttpStatus.OK);
    }
    @DeleteMapping("/demenagement/{demID}")
    public void deleteDemenagement(@PathVariable Long demID){
        demenagementService.deleteById(demID);
    }
    @GetMapping("/camion/count")
    public ResponseEntity<Long> getCountCamion(){
        return new ResponseEntity<>(camionService.countCamion(),HttpStatus.OK);
    }
    @GetMapping("/demenagement/count")
    public ResponseEntity<Long> getCountDemem(){
        return new ResponseEntity<>(demenagementService.countDemenagement(),HttpStatus.OK);
    }


}

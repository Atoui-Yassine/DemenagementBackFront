package com.example.ProjectDemenagment.contollers;

import com.example.ProjectDemenagment.models.Demenagement;
import com.example.ProjectDemenagment.models.StautsDem;
import com.example.ProjectDemenagment.services.DemenagementService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/chauffeur")
public class ChauffeurController {
    @Autowired
    private DemenagementService demenagementService;

    @GetMapping("/demenagements")
    public ResponseEntity<List<Demenagement>> AllDemenagementByChauffeur(Principal principal){
        return new ResponseEntity<>(demenagementService.allDemenagementByChauffeur(principal), HttpStatus.OK);
    }

    @PutMapping("/demenagement/{reservationId}/{status}")
    public ResponseEntity<Demenagement> changeStatusDemenagement(@PathVariable Long reservationId, @PathVariable StautsDem status, Principal principal) throws MessagingException, IOException {
        return new ResponseEntity<>(demenagementService.chaufeurCaheStatus(reservationId,status,principal),HttpStatus.OK);
    }
}

package com.example.ProjectDemenagment.contollers;

import com.example.ProjectDemenagment.models.Demenagement;
import com.example.ProjectDemenagment.models.StautsDem;
import com.example.ProjectDemenagment.services.DemenagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/client")
public class ClientController {
    @Autowired
    private DemenagementService demenagementService;

    @PostMapping("/demenagement")
    public ResponseEntity<?> createDemenagement(@RequestBody Demenagement demenagement, Principal principal){
        try {
            return new ResponseEntity<>(demenagementService.createDemenagement(demenagement,principal), HttpStatus.CREATED);
        }catch (RuntimeException e) {
            String errorMessage = e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }
    @GetMapping("/demenagements")
    public ResponseEntity<List<Demenagement>> AllDemenagementByClient(Principal principal){
        return new ResponseEntity<>(demenagementService.allDemenagementByClient(principal),HttpStatus.OK);
    }
    @PutMapping("/demenagement/{reservationId}/{status}")
    public ResponseEntity<Demenagement> CanceledDemenagement(@PathVariable Long reservationId, @PathVariable StautsDem status, Principal principal){
        return new ResponseEntity<>(demenagementService.changeStatus(reservationId,status,principal),HttpStatus.OK);
    }

}

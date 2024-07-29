package com.example.ProjectDemenagment.services;

import com.example.ProjectDemenagment.DTOs.request.ChaffeurDTO;
import com.example.ProjectDemenagment.DTOs.request.ClientDTO;
import com.example.ProjectDemenagment.exceptions.BadRequestException;
import com.example.ProjectDemenagment.exceptions.EmailNotFoundException;
import com.example.ProjectDemenagment.exceptions.EntityNotFoundException;
import com.example.ProjectDemenagment.models.Demenagement;
import com.example.ProjectDemenagment.models.ERole;
import com.example.ProjectDemenagment.models.Role;
import com.example.ProjectDemenagment.models.UserModel;
import com.example.ProjectDemenagment.repositories.DemenagementRepository;
import com.example.ProjectDemenagment.repositories.UserRepository;
import com.example.ProjectDemenagment.utils.Mapper;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordService passwordServicer;
    @Autowired
    private DemenagementRepository demenagementRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private RoleService roleService;
    public UserModel saveUser(UserModel user){
        return userRepository.save(user);
    }
    public boolean existsById(Long userId) {
        return userRepository.existsById(userId);
    }
    public Boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }
    public UserModel findById(Long id){
        UserModel user=userRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("User not found with id : "+id));
        return user;
    }
    public UserModel findByEmail(String email){
        UserModel user=userRepository.findByEmail(email)
                .orElseThrow(()-> new EntityNotFoundException("User not found with email : "+email));
        return user;
    }

    public UserModel  AddChauffeur(ChaffeurDTO chauffeurDTO, Principal principal) throws MessagingException, IOException  {
        if(this.existsByEmail(chauffeurDTO.getEmail())) {
            throw new BadRequestException("Email is already exist !!");
        }
            Set<Role> roles = new HashSet<>();
            String from=principal.getName();
            String rawPassword = passwordServicer.generateRandomPassword();
            String encodedPassword = passwordServicer.encodePassword(rawPassword);
            Role userRole = roleService.findRoleByName(ERole.ROLE_CHAUFFEUR);
            roles.add(userRole);
            UserModel user = UserModel.builder()
                    .firstname(chauffeurDTO.getFirstname())
                    .lastname(chauffeurDTO.getLastname())
                    .nationality(chauffeurDTO.getNationality())
                    .phone(chauffeurDTO.getTelephone1())
                    .email(chauffeurDTO.getEmail())
                    .password(encodedPassword)
                    .avatar(chauffeurDTO.getAvatar())
                    .adresse(chauffeurDTO.getAdresse())
                    .date_naissance(LocalDate.parse(chauffeurDTO.getDate_naissance()))
                    .lieu_naissance(chauffeurDTO.getLieu_naissance())
                    .telephone2(chauffeurDTO.getTelephone2())
                    .num_permis(chauffeurDTO.getNum_permis())
                    .date_delivrance(LocalDate.parse(chauffeurDTO.getDate_delivrance()))
                    .lieu_delivrance(chauffeurDTO.getLieu_delivrance())
                    .piece_identite(chauffeurDTO.getPiece_identite())
                    .num_piece(chauffeurDTO.getNum_piece())
                    .date_delivrancePiece(LocalDate.parse(chauffeurDTO.getDate_delivrancePiece()))
                    .lieu_delivrancePiece(chauffeurDTO.getLieu_delivrancePiece())
                    .name_formation(chauffeurDTO.getName_formation())
                    .filename(chauffeurDTO.getFilename())
                    .rib(chauffeurDTO.getRib())
                    .vitale(chauffeurDTO.getVitale())
                    .roles(roles)
                    .build();

            UserModel savedUser = this.saveUser(user);

        try {

            emailService.sendEmail(from, savedUser.getEmail(), "Vos informations de connexion", savedUser.getFirstname(), savedUser.getEmail(), rawPassword);
            return savedUser;
        } catch (EmailNotFoundException e) {
            throw new BadRequestException("The admin email is not valid: " + from);
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
            throw new RuntimeException("An error occurred while sending the email.");
        }

    }


    public List<ChaffeurDTO> getAllChaufeurs(){
        List<UserModel> users = userRepository.findByRole(ERole.ROLE_CHAUFFEUR);
        return users.stream()
                .map(Mapper::toDto)
                .collect(Collectors.toList());
    }

    public List<ClientDTO> getAllClient(){
        List<UserModel> users =userRepository.findByRole(ERole.ROLE_USER);
        return users.stream()
                .map(Mapper::userToDto)
                .collect(Collectors.toList());
    }


    public void deleteById(Long chauffeurId) {
        if( !existsById(chauffeurId)) {
            throw new EntityNotFoundException("user not found");
        }
        userRepository.deleteById(chauffeurId);
    }
    public void deleteChById(Long chauffeurId) {
        UserModel chauffeur = userRepository.findById(chauffeurId).orElseThrow(() -> new RuntimeException("chauffeyr not found"));
        for (Demenagement demenagement : chauffeur.getDemenagementsAsChauffeur()) {
            demenagement.setChauffeur(null);
            demenagementRepository.save(demenagement);
        }
        userRepository.delete(chauffeur);
    }

    public Long countUser(ERole role){
        return userRepository.countByRole(role);
    }

}

package com.example.ProjectDemenagment.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
@Builder
@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;
    private String lastname;
    @JsonIgnore
    private String password;
    private String nationality;
    private String phone;
    private String email;
    private String avatar;
    private String adresse;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date_naissance;
    private String lieu_naissance;
    private String telephone1;
    private String telephone2;
    private String num_permis;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date_delivrance;
    private String lieu_delivrance;
    private String piece_identite;
    private String num_piece;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date_delivrancePiece;
    private String lieu_delivrancePiece;
    private String name_formation;
    private String filename;
    private String rib;
    private String vitale;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles=new HashSet<>();
    @OneToMany(mappedBy = "adminAdd", cascade = CascadeType.ALL, orphanRemoval = false, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Camion> CamionList = new HashSet<>();

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = false)
    @JsonIgnore
    private Set<Demenagement> demenagementsAsClient = new HashSet<>();

    @OneToMany(mappedBy = "chauffeur", cascade = CascadeType.PERSIST, orphanRemoval = false)
    @JsonIgnore
    private Set<Demenagement> demenagementsAsChauffeur = new HashSet<>();
    public UserModel(String firstname, String lastname, String email, String password,String adresse, String phone) {

        this.firstname = firstname;
        this.lastname = lastname;
        this.email=email;
        this.password = password;
        this.adresse=adresse;
        this.phone=phone;

    }

    public UserModel(String email, String password) {

        this.email = email;
        this.password = password;
    }

}

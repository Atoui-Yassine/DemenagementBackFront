package com.example.ProjectDemenagment.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "camions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Camion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String immatriculation;
    private String marque;
    private String modele;
    private String categorie;
    private int nbPlaces;
    private String photo;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private UserModel adminAdd;
    @OneToMany(mappedBy = "camion", cascade = CascadeType.PERSIST, orphanRemoval = false)
    @JsonIgnore
    private Set<Demenagement> demenagements = new HashSet<>();


}

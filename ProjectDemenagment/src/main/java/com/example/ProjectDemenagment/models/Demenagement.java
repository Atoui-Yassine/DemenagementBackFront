package com.example.ProjectDemenagment.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Builder
@Entity
@Table(name = "demenagement")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Demenagement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    private String startAddress;
    private String endAddress;
    private String furnitureCategory;
    @Enumerated(EnumType.STRING)
    @Column(length = 25)
    private StautsDem status;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private UserModel client;

    @ManyToOne
    @JoinColumn(name = "chauffeur_id")
    private UserModel chauffeur;

    @ManyToOne
    @JoinColumn(name = "camion_id")
    private Camion camion;
}

package com.example.ProjectDemenagment.DTOs.request;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ChaffeurDTO {
    private Long id;
    private String avatar;
    private String nationality;
    private String firstname;
    private String lastname;
    private String rib;
    private String vitale;
    private String date_naissance;
    private String lieu_naissance;
    private String email;
    private String adresse;
    private String telephone1;
    private String telephone2;
    private String num_permis;
    private String date_delivrance;
    private String lieu_delivrance;
    private String piece_identite;
    private String num_piece;
    private String date_delivrancePiece;
    private String lieu_delivrancePiece;
    private String name_formation;
    private String filename;

}

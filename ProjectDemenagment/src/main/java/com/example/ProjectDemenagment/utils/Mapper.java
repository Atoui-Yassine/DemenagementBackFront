package com.example.ProjectDemenagment.utils;

import com.example.ProjectDemenagment.DTOs.request.ChaffeurDTO;
import com.example.ProjectDemenagment.DTOs.request.ClientDTO;
import com.example.ProjectDemenagment.models.UserModel;

public class Mapper {
    public static ChaffeurDTO toDto(UserModel user) {
        return ChaffeurDTO.builder()
                .id(user.getId())
                .avatar(user.getAvatar())
                .nationality(user.getNationality())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .rib(user.getRib())
                .vitale(user.getVitale())
                .date_naissance(user.getLieu_naissance().toString())
                .lieu_naissance(user.getLieu_naissance())
                .email(user.getEmail())
                .adresse(user.getAdresse())
                .telephone1(user.getTelephone1())
                .telephone2(user.getTelephone2())
                .num_permis(user.getNum_permis())
                .date_delivrance(user.getLieu_delivrance().toString())
                .lieu_delivrance(user.getLieu_delivrance())
                .piece_identite(user.getPiece_identite())
                .num_piece(user.getNum_piece())
                .date_delivrancePiece(user.getLieu_delivrancePiece().toString())
                .lieu_delivrancePiece(user.getLieu_delivrancePiece())
                .name_formation(user.getName_formation())
                .filename(user.getFilename())
                .build();
    }


    public static ClientDTO userToDto(UserModel user) {
        return ClientDTO.builder()
                .id(user.getId())
                .avatar(user.getAvatar())
                .nationality(user.getNationality())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .address(user.getAdresse())
                .phone(user.getPhone())
                .build();
    }
}

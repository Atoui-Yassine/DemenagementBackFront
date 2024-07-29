package com.example.ProjectDemenagment.DTOs.request;

import lombok.Data;

@Data
public class AssigneDemande {
    private Long reservationId;
    private Long driverId;
    private Long camionId;
    private String description;
}

package com.example.ProjectDemenagment.DTOs.request;

import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class ClientDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String nationality;
    private String phone;
    private String email;
    private String avatar;
    private String address;
}

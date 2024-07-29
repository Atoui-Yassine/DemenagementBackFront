package com.example.ProjectDemenagment.contollers;

import com.example.ProjectDemenagment.DTOs.request.LoginRequest;
import com.example.ProjectDemenagment.DTOs.request.SignupRequest;
import com.example.ProjectDemenagment.DTOs.response.JwtResponse;
import com.example.ProjectDemenagment.DTOs.response.MessageResponse;
import com.example.ProjectDemenagment.models.ERole;
import com.example.ProjectDemenagment.models.Role;
import com.example.ProjectDemenagment.models.UserModel;
import com.example.ProjectDemenagment.repositories.RoleRepository;
import com.example.ProjectDemenagment.securities.jwt.JwtUtils;
import com.example.ProjectDemenagment.securities.services.UserDetailsImpl;
import com.example.ProjectDemenagment.securities.services.UserDetailsServiceImpl;
import com.example.ProjectDemenagment.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    UserService userService;
    @Autowired
    RoleRepository roleService;
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Value("${jwtSecret}")
    private String jwtSecret;

    @Value("${jwtExpirationMs}")
    private int jwtExpirationMs;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        String refreshJwt = jwtUtils.generateRefreshJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        UserModel user=userService.findById(userDetails.getId());
        userService.saveUser(user);
        return ResponseEntity.ok( JwtResponse.builder()
                .token(jwt)
                .refreshToken(refreshJwt)
                .roles(roles)
                .build());
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {


        if (userService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        UserModel user = new UserModel(
                signUpRequest.getFirstname(),
                signUpRequest.getLastname(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getAddress(),
                signUpRequest.getPhone()
                );

        String strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleService.findRoleByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
        user.setRoles(roles);
        userService.saveUser(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}

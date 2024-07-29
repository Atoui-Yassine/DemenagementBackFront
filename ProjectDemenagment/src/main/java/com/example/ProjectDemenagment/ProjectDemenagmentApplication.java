package com.example.ProjectDemenagment;

import com.example.ProjectDemenagment.models.ERole;
import com.example.ProjectDemenagment.models.Role;
import com.example.ProjectDemenagment.models.UserModel;
import com.example.ProjectDemenagment.repositories.RoleRepository;
import com.example.ProjectDemenagment.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ProjectDemenagmentApplication {
	@Autowired
	private PasswordEncoder encoder;
	public static void main(String[] args) {
		SpringApplication.run(ProjectDemenagmentApplication.class, args);
	}
	@Bean
	CommandLineRunner run(RoleRepository roleRpository , UserRepository userRepository){
		return args -> {

			if (roleRpository.count()<1) {

				roleRpository.save(new Role( null, ERole.ROLE_ADMIN));
				roleRpository.save(new Role(null, ERole.ROLE_CHAUFFEUR));
				roleRpository.save(new Role(null,ERole.ROLE_USER));
			}
			if(!userRepository.existsByEmail("yassin2016.attoui@gmail.com")){
				UserModel user = new UserModel(
						"yassin2016.attoui@gmail.com",

						encoder.encode("password")
				);

				Role adminRole = roleRpository.findRoleByName(ERole.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));

				user.getRoles().add(adminRole);
				userRepository.save(user);
			}
		};
	}

}

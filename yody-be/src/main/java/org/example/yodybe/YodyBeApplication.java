package org.example.yodybe;

import org.example.yodybe.entity.User;
import org.example.yodybe.repositoties.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class YodyBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(YodyBeApplication.class, args);
	}
}

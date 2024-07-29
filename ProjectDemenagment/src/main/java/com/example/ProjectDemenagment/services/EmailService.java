package com.example.ProjectDemenagment.services;

import com.example.ProjectDemenagment.exceptions.EmailNotFoundException;
import jakarta.mail.MessagingException;
import jakarta.mail.SendFailedException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


import java.io.IOException;
import java.time.LocalDate;


@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendEmail(String from ,String to, String subject, String firstname, String email, String password) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);

        Context context = new Context();
        context.setVariable("firstname", firstname);
        context.setVariable("email", email);
        context.setVariable("password", password);

        String htmlContent = templateEngine.process("email-template", context);

        helper.setText(htmlContent, true);


        try {
            mailSender.send(message);
        } catch (Exception e) {
            if (e.getCause() instanceof jakarta.mail.SendFailedException) {
                throw new EmailNotFoundException("The from email address is not found: " + from);
            }
            throw e;
        }

    }

    public void sendEmailNotifConfirmation(String from , String to, String subject, LocalDate date , String firstname, String status) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);

        Context context = new Context();
        context.setVariable("firstname", firstname);
        context.setVariable("date", date);
        context.setVariable("status", status);

        String htmlContent = templateEngine.process("email", context);

        helper.setText(htmlContent, true);


        try {
            mailSender.send(message);
        } catch (Exception e) {
            if (e.getCause() instanceof jakarta.mail.SendFailedException) {
                throw new EmailNotFoundException("The from email address is not found: " + from);
            }
            throw e;
        }

    }
}

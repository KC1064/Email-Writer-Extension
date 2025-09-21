package com.email_extension.email_write_extension_be.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.email_extension.email_write_extension_be.controller.EmailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }


    public String generateEmailReply(EmailRequest emailRequest){
        //System Prompt
        String prompt = buildPrompt(emailRequest);

        //Craft the request
       Map<String, Object> requestBody = Map.of(
               "contents",new Object[]{
                       Map.of("parts", new Object[]{
                               Map.of("text",prompt)
                       })
               }
       );
        //Do request and get response
        String response = webClient.post()
                .uri(geminiApiUrl)
                .header("Content-Type", "application/json")
                .header("X-Goog-Api-Key", geminiApiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        //extract response and return response
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        } catch (Exception e) {
            return "Error Processing Request" + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest){
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a email reply for the following email content. The tone and style are as follows: ");
        if (emailRequest.getTone() != null && !emailRequest.getEmailContent().isEmpty()){
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone").append("Strict Instructions: I want the response in text format no json. Also there shouldn't be any Subject");
        }
        prompt.append("\n Original email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}

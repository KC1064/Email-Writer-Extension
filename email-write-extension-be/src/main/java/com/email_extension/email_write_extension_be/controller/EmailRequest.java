package com.email_extension.email_write_extension_be.controller;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}

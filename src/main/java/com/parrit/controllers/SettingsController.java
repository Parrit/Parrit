package com.parrit.controllers;

import com.parrit.repositories.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SettingsController {

    SettingsRepository settingsRepository;

    @Autowired
    public SettingsController(SettingsRepository repository) {
        this.settingsRepository = repository;
    }
}

package com.parrit.utilities;

import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
public class CurrentTimeProvider {

    public Timestamp getCurrentTime() {
        return new Timestamp(System.currentTimeMillis());
    }

}

package com.parrit.DTOs;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@EqualsAndHashCode
@Builder
public class ErrorDTO {

    private String message;

    private Map<String, String> fieldErrors;

}

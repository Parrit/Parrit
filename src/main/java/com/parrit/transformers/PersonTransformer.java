package com.parrit.transformers;

import com.parrit.DTOs.PersonDTO;
import com.parrit.entities.Person;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class PersonTransformer {

    public static PersonDTO transform(Person person) {
        PersonDTO personDTO = new PersonDTO();
        personDTO.setId(person.getId());
        personDTO.setName(person.getName());
        return personDTO;
    }

    public static List<PersonDTO> transform(List<Person> persons) {
        if(persons == null || persons.isEmpty()) return Collections.emptyList();
        return persons.stream()
                .map(PersonTransformer::transform)
                .collect(Collectors.toList());
    }

}

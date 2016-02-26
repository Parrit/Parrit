package com.parrit.transformers;

import com.parrit.DTOs.PersonDTO;
import com.parrit.entities.Person;

import java.util.ArrayList;
import java.util.List;

public class PersonTransformer {

    public static PersonDTO transform(Person person) {
        PersonDTO personDTO = new PersonDTO();
        personDTO.setId(person.getId());
        personDTO.setName(person.getName());
        return personDTO;
    }

    public static List<PersonDTO> transform(List<Person> persons) {
        List<PersonDTO> personDTOs = new ArrayList<>();
        for(Person person : persons) {
            personDTOs.add(transform(person));
        }
        return personDTOs;
    }

}

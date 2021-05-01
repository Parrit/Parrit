package com.parrit.transformers;

import com.parrit.DTOs.PersonDTO;
import com.parrit.entities.Person;

import java.util.List;
import java.util.Set;

import static java.util.Collections.emptyList;
import static java.util.Collections.emptySet;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;
import static org.springframework.util.CollectionUtils.isEmpty;

public class PersonTransformer {

    public static PersonDTO transform(Person person) {
        PersonDTO personDTO = new PersonDTO();
        personDTO.setId(person.getId());
        personDTO.setName(person.getName());
        return personDTO;
    }

    public static List<PersonDTO> transform(Set<Person> persons) {
        if (isEmpty(persons)) return emptyList();
        return persons.stream()
                .map(PersonTransformer::transform)
                .collect(toList());
    }

    public static Person reverse(PersonDTO personDTO) {
        Person person = new Person();
        person.setId(personDTO.getId());
        person.setName(personDTO.getName());
        return person;
    }

    public static Set<Person> reverse(List<PersonDTO> personDTOs) {
        if (isEmpty(personDTOs)) return emptySet();
        return personDTOs.stream()
                .map(PersonTransformer::reverse)
                .collect(toSet());
    }

}

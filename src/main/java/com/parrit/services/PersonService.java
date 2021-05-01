package com.parrit.services;

import com.parrit.DTOs.PersonDTO;
import com.parrit.entities.Person;
import com.parrit.exceptions.PersonNotFoundException;
import com.parrit.repositories.PersonRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@Component
public class PersonService {
    final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Set<Person> peopleFromDTOList(List<PersonDTO> dtos) {
        return dtos.stream()
                .map(dto -> personRepository
                        .findById(dto.getId())
                        .orElseThrow(() -> new PersonNotFoundException("Could not find person with id " + dto.getId()))
                )
                .collect(toSet());
    }
}

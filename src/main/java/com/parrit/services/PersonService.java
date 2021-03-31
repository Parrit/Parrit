package com.parrit.services;

import com.parrit.DTOs.PersonDTO;
import com.parrit.entities.Person;
import com.parrit.exceptions.PersonNotFoundException;
import com.parrit.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PersonService {
    @Autowired PersonRepository personRepository;

    public List<Person> peopleFromDTOList(List<PersonDTO> dtos) {
        return dtos.stream().map(dto -> {
            Optional<Person> oPerson = personRepository.findById(dto.getId());
            if (oPerson.isPresent()) {
                return oPerson.get();
            } else {
                throw new PersonNotFoundException("Could not find person with id " + dto.getId());
            }
        }).collect(Collectors.toList());
    }
}

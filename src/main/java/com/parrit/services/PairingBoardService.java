package com.parrit.services;

import com.parrit.DTOs.PairingBoardDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.exceptions.PairingBoardNotFoundException;
import com.parrit.repositories.PairingBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PairingBoardService {
    @Autowired PairingBoardRepository pairingBoardRepository;
    @Autowired PersonService personService;
    @Autowired RoleService roleService;

    public PairingBoard updatePairingBoardWithDTO(PairingBoardDTO dto) {
        Optional<PairingBoard> opb = pairingBoardRepository.findById(dto.getId());
        if (opb.isPresent()) {
            PairingBoard pb = opb.get();
            pb.setPeople(personService.peopleFromDTOList(dto.getPeople()));
            pb.setRoles(roleService.rolesFromDTOList(dto.getRoles()));
            pairingBoardRepository.save(pb);
            return pb;
        } else {
            throw new PairingBoardNotFoundException("While updating, could not find pairing board with id: " + dto.getId());
        }
    }

    public List<PairingBoard> updatePairingBoardsBasedOnList(List<PairingBoardDTO> dtoList) {
        return  dtoList.stream().map(this::updatePairingBoardWithDTO).collect(Collectors.toList());
    }
}

package com.parrit.services;

import com.parrit.DTOs.PairingBoardDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.exceptions.PairingBoardNotFoundException;
import com.parrit.repositories.PairingBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Component
public class PairingBoardService {

    private final PairingBoardRepository pairingBoardRepository;
    private final PersonService personService;
    private final RoleService roleService;

    @Autowired
    public PairingBoardService(
            PairingBoardRepository pairingBoardRepository,
            PersonService personService,
            RoleService roleService
    ) {
        this.pairingBoardRepository = pairingBoardRepository;
        this.personService = personService;
        this.roleService = roleService;
    }

    public PairingBoard updatePairingBoardWithDTO(PairingBoardDTO dto) {
        return pairingBoardRepository.findById(dto.getId())
                .map(board -> {
                    board.setPeople(personService.peopleFromDTOList(dto.getPeople()));
                    board.setRoles(roleService.rolesFromDTOList(dto.getRoles()));
                    pairingBoardRepository.save(board);
                    return board;
                })
                .orElseThrow(() -> new PairingBoardNotFoundException("While updating, could not find pairing board with id: " + dto.getId()));
    }

    public List<PairingBoard> updatePairingBoardsBasedOnList(List<PairingBoardDTO> dtoList) {
        return dtoList.stream().map(this::updatePairingBoardWithDTO).collect(toList());
    }
}

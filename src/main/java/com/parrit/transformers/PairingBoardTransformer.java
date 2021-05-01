package com.parrit.transformers;

import com.parrit.DTOs.PairingBoardDTO;
import com.parrit.entities.PairingBoard;

import java.util.List;
import java.util.Set;

import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;
import static org.springframework.util.CollectionUtils.isEmpty;

public class PairingBoardTransformer {

    public static PairingBoardDTO transform(PairingBoard pairingBoard) {
        PairingBoardDTO pairingBoardDTO = new PairingBoardDTO();
        pairingBoardDTO.setId(pairingBoard.getId());
        pairingBoardDTO.setName(pairingBoard.getName());
        pairingBoardDTO.setExempt(pairingBoard.isExempt());
        pairingBoardDTO.setPeople(PersonTransformer.transform(pairingBoard.getPeople()));
        pairingBoardDTO.setRoles(RoleTransformer.transform(pairingBoard.getRoles()));
        return pairingBoardDTO;
    }

    public static List<PairingBoardDTO> transform(Set<PairingBoard> pairingBoards) {
        if (isEmpty(pairingBoards)) return emptyList();
        return pairingBoards.stream()
                .map(PairingBoardTransformer::transform)
                .collect(toList());
    }

    public static PairingBoard reverse(PairingBoardDTO pairingBoardDTO) {
        PairingBoard pairingBoard = new PairingBoard();
        pairingBoard.setId(pairingBoardDTO.getId());
        pairingBoard.setName(pairingBoardDTO.getName());
        pairingBoard.setExempt(pairingBoardDTO.isExempt());
        pairingBoard.setPeople(PersonTransformer.reverse(pairingBoardDTO.getPeople()));
        pairingBoard.setRoles(RoleTransformer.reverse(pairingBoardDTO.getRoles()));
        return pairingBoard;
    }

    public static List<PairingBoard> reverse(List<PairingBoardDTO> pairingBoardDTOs) {
        if (isEmpty(pairingBoardDTOs)) return emptyList();
        return pairingBoardDTOs.stream()
                .map(PairingBoardTransformer::reverse)
                .collect(toList());
    }
}

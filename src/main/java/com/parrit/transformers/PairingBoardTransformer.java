package com.parrit.transformers;

import com.parrit.DTOs.PairingBoardDTO;
import com.parrit.entities.PairingBoard;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

    public static List<PairingBoardDTO> transform(List<PairingBoard> pairingBoards) {
        if(pairingBoards == null || pairingBoards.isEmpty()) return Collections.emptyList();
        return pairingBoards.stream()
                .map(PairingBoardTransformer::transform)
                .collect(Collectors.toList());
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
        if(pairingBoardDTOs == null || pairingBoardDTOs.isEmpty()) return Collections.emptyList();
        return pairingBoardDTOs.stream()
            .map(PairingBoardTransformer::reverse)
            .collect(Collectors.toList());
    }
}

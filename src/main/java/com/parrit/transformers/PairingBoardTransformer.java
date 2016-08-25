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
        pairingBoardDTO.setExempt(pairingBoard.getExempt());
        pairingBoardDTO.setName(pairingBoard.getName());
        pairingBoardDTO.setPeople(PersonTransformer.transform(pairingBoard.getPeople()));
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
        pairingBoard.setExempt(pairingBoardDTO.getExempt());
        pairingBoard.setPeople(PersonTransformer.reverse(pairingBoardDTO.getPeople()));
        return pairingBoard;
    }

    public static List<PairingBoard> reverse(List<PairingBoardDTO> pairingBoardDTOs) {
        if(pairingBoardDTOs == null || pairingBoardDTOs.isEmpty()) return Collections.emptyList();
        return pairingBoardDTOs.stream()
            .map(PairingBoardTransformer::reverse)
            .collect(Collectors.toList());
    }
}

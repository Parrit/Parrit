package com.parrit.transformers;

import com.parrit.DTOs.SpaceDTO;
import com.parrit.entities.Space;

import java.util.ArrayList;
import java.util.List;

public class SpaceTransformer {

    public static SpaceDTO transform(Space space) {
        SpaceDTO spaceDTO = new SpaceDTO();
        spaceDTO.setId(space.getId());
        spaceDTO.setName(space.getName());
        spaceDTO.setPeople(PersonTransformer.transform(space.getPeople()));
        return spaceDTO;
    }

    public static List<SpaceDTO> transform(List<Space> spaces) {
        List<SpaceDTO> spaceDTOs = new ArrayList<>();
        for(Space space : spaces) {
            spaceDTOs.add(transform(space));
        }
        return spaceDTOs;
    }

}

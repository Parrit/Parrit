package com.parrit.transformers;

import com.parrit.DTOs.SpaceDTO;
import com.parrit.entities.Space;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class SpaceTransformer {

    public static SpaceDTO transform(Space space) {
        SpaceDTO spaceDTO = new SpaceDTO();
        spaceDTO.setId(space.getId());
        spaceDTO.setName(space.getName());
        spaceDTO.setPeople(PersonTransformer.transform(space.getPeople()));
        return spaceDTO;
    }

    public static List<SpaceDTO> transform(List<Space> spaces) {
        if(spaces == null || spaces.isEmpty()) return Collections.emptyList();
        return spaces.stream()
                .map(SpaceTransformer::transform)
                .collect(Collectors.toList());
    }

}

package com.parrit.services;

import com.parrit.DTOs.RoleDTO;
import com.parrit.entities.Role;
import com.parrit.exceptions.RoleNotFoundException;
import com.parrit.repositories.RoleRepository;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Component
public class RoleService {
    final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> rolesFromDTOList(List<RoleDTO> roleList) {
        return roleList.stream()
                .map(roleDto -> roleRepository
                        .findById(roleDto.getId())
                        .orElseThrow(() -> new RoleNotFoundException("While updating could not find role id: " + roleDto.getId()))
                )
                .collect(toList());
    }
}

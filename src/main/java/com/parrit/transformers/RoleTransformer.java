package com.parrit.transformers;

import com.parrit.DTOs.RoleDTO;
import com.parrit.entities.Role;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class RoleTransformer {

    public static RoleDTO transform(Role role) {
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(role.getId());
        roleDTO.setName(role.getName());
        return roleDTO;
    }

    public static List<RoleDTO> transform(List<Role> roles) {
        if(roles == null || roles.isEmpty()) return Collections.emptyList();
        return roles.stream()
                .map(RoleTransformer::transform)
                .collect(Collectors.toList());
    }

    public static Role reverse(RoleDTO roleDTO) {
        Role role = new Role();
        role.setId(roleDTO.getId());
        role.setName(roleDTO.getName());
        return role;
    }

    public static List<Role> reverse(List<RoleDTO> roleDTOs) {
        if(roleDTOs == null || roleDTOs.isEmpty()) return Collections.emptyList();
        return roleDTOs.stream()
            .map(RoleTransformer::reverse)
            .collect(Collectors.toList());
    }

}

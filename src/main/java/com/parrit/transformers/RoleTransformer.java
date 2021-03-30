package com.parrit.transformers;

import com.parrit.DTOs.RoleDTO;
import com.parrit.entities.Role;

import java.util.List;

import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;
import static org.springframework.util.CollectionUtils.isEmpty;

public class RoleTransformer {

    public static RoleDTO transform(Role role) {
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(role.getId());
        roleDTO.setName(role.getName());
        return roleDTO;
    }

    public static List<RoleDTO> transform(List<Role> roles) {
        if (isEmpty(roles)) return emptyList();
        return roles.stream()
                .map(RoleTransformer::transform)
                .collect(toList());
    }

    public static Role reverse(RoleDTO roleDTO) {
        Role role = new Role();
        role.setId(roleDTO.getId());
        role.setName(roleDTO.getName());
        return role;
    }

    public static List<Role> reverse(List<RoleDTO> roleDTOs) {
        if (isEmpty(roleDTOs)) return emptyList();
        return roleDTOs.stream()
                .map(RoleTransformer::reverse)
                .collect(toList());
    }

}

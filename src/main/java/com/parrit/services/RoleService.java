package com.parrit.services;

import com.parrit.DTOs.RoleDTO;
import com.parrit.entities.Role;
import com.parrit.exceptions.RoleNotFoundException;
import com.parrit.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class RoleService {
    @Autowired RoleRepository roleRepository;

    public List<Role> rolesFromDTOList(List<RoleDTO> roleList) {
        return roleList.stream().map(roleDto -> {
            Optional<Role> oRole = roleRepository.findById(roleDto.getId());
            if (oRole.isPresent()) {
                return oRole.get();
            } else {
                throw new RoleNotFoundException("While updating could not find role id: " + roleDto.getId());
            }
        }).collect(Collectors.toList());
    }
}

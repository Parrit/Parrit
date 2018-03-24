package com.parrit.controllers;

import com.parrit.DTOs.ProjectDTO;
import com.parrit.DTOs.RoleDTO;
import com.parrit.DTOs.RolePositionDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Project;
import com.parrit.entities.Role;
import com.parrit.exceptions.PairingBoardNotFoundException;
import com.parrit.exceptions.PairingBoardPositionNotFoundException;
import com.parrit.exceptions.RoleNotFoundException;
import com.parrit.repositories.ProjectRepository;
import com.parrit.repositories.RoleRepository;
import com.parrit.transformers.ProjectTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
public class RoleController {

    private final ProjectRepository projectRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public RoleController(ProjectRepository projectRepository, RoleRepository roleRepository) {
        this.projectRepository = projectRepository;
        this.roleRepository = roleRepository;
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairingBoard/{pairingBoardId}/role", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ProjectDTO> addRole(@PathVariable long projectId, @PathVariable long pairingBoardId, @RequestBody @Valid RoleDTO roleDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

        PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                .filter(pb -> pb.getId() == pairingBoardId)
                .findFirst()
                .orElseThrow(() -> new PairingBoardNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

        matchingPairingBoard.getRoles().add(new Role(roleDTO.getName()));

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairingBoard/{pairingBoardId}/role/{roleId}/position", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<ProjectDTO> moveRole(@PathVariable long projectId, @PathVariable long pairingBoardId, @PathVariable long roleId, @RequestBody @Valid RolePositionDTO rolePositionDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

        PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                .filter(pb -> pb.getId() == pairingBoardId)
                .findFirst()
                .orElseThrow(() -> new PairingBoardNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

        Role matchingRole = matchingPairingBoard.getRoles().stream()
                .filter(r -> r.getId() == roleId)
                .findFirst()
                .orElseThrow(() -> new RoleNotFoundException("Keeaa!? That role doesn't seem to exist."));

        matchingPairingBoard.getRoles().remove(matchingRole);

        PairingBoard newPairingBoard = savedProject.getPairingBoards().stream()
                .filter(pb -> pb.getId() == rolePositionDTO.getPairingBoardId())
                .findFirst()
                .orElseThrow(() -> new PairingBoardPositionNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

        newPairingBoard.getRoles().add(matchingRole);

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairingBoard/{pairingBoardId}/role/{roleId}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<ProjectDTO> deleteRole(@PathVariable long projectId, @PathVariable long pairingBoardId, @PathVariable long roleId) {
        Project savedProject = projectRepository.findById(projectId).get();

        PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                .filter(pb -> pb.getId() == pairingBoardId)
                .findFirst()
                .orElseThrow(() -> new PairingBoardNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

        Role matchingRole = matchingPairingBoard.getRoles().stream()
                .filter(r -> r.getId() == roleId)
                .findFirst()
                .orElseThrow(() -> new RoleNotFoundException("Keeaa!? That role doesn't seem to exist."));

        matchingPairingBoard.getRoles().remove(matchingRole);
        roleRepository.delete(matchingRole);

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

}

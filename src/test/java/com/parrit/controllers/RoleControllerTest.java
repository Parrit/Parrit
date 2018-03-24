package com.parrit.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.DTOs.RoleDTO;
import com.parrit.DTOs.RolePositionDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Project;
import com.parrit.entities.Role;
import com.parrit.repositories.ProjectRepository;
import com.parrit.repositories.RoleRepository;
import com.parrit.transformers.ProjectTransformer;
import com.parrit.transformers.RoleTransformer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = RoleController.class, secure = false)
public class RoleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProjectRepository mockProjectRepository;

    @MockBean
    private RoleRepository mockRoleRepository;

    @Test
    public void addRole_createsARoleWithTheGivenName_andReturnsTheUpdatedProject() throws Exception {
        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard.setId(2L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>());
        existingProject.setId(1L);

        Role newRole = new Role("Ballers");

        RoleDTO roleDTO = RoleTransformer.transform(newRole);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        PairingBoard expectedPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(), Collections.singletonList(newRole));
        expectedPairingBoard.setId(2L);

        Project expectedProject = new Project("Henry", "henrypass", Collections.singletonList(expectedPairingBoard), new ArrayList<>());
        expectedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedProject);

        mockMvc.perform(post("/api/project/1/pairingBoard/2/role")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(roleDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        verify(mockProjectRepository).findById(1L);
        verify(mockProjectRepository).save(expectedProject);
    }

    @Test
    public void addRole_whenNameIsEmpty_returnsError() throws Exception {
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setName("");

        mockMvc.perform(post("/api/project/1/pairingBoard/2/role")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(roleDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void addRole_whenNameIsNull_returnsError() throws Exception {
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setName(null);

        mockMvc.perform(post("/api/project/1/pairingBoard/2/role")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(roleDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void addRole_whenNameIsGreaterThan32Characters_returnsError() throws Exception {
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setName("someNameThatIsGreaterThan32Characters");

        mockMvc.perform(post("/api/project/1/pairingBoard/2/role")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(roleDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void addRole_whenNoPairingBoardMatchesGivenId_returnsError() throws Exception {
        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard.setId(2L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>());
        existingProject.setId(1L);

        Role newRole = new Role("Ballers");

        RoleDTO roleDTO = RoleTransformer.transform(newRole);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));

        mockMvc.perform(post("/api/project/1/pairingBoard/77/role")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(roleDTO)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.id", equalTo("Keeaa!? That pairing board doesn't seem to exist.")));

        verify(mockProjectRepository).findById(1L);
    }

    @Test
    public void moveRole_movesMatchingRoleToPairingBoard_andReturnsTheUpdatedProject() throws Exception {
        Role existingRole = new Role("Ballers");
        existingRole.setId(3L);

        PairingBoard existingPairingBoard1 = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingRole)));
        existingPairingBoard1.setId(2L);

        PairingBoard existingPairingBoard2 = new PairingBoard("Lame Kids", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard2.setId(4L);

        Project existingProject = new Project("Henry", "henrypass", Arrays.asList(existingPairingBoard1, existingPairingBoard2), new ArrayList<>());
        existingProject.setId(1L);

        RolePositionDTO rolePositionDTO = new RolePositionDTO();
        rolePositionDTO.setPairingBoardId(4L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        Role expectedRole = new Role("Ballers");
        expectedRole.setId(3L);

        PairingBoard expectedPairingBoard1 = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>());
        expectedPairingBoard1.setId(2L);

        PairingBoard expectedPairingBoard2 = new PairingBoard("Lame Kids", false, new ArrayList<>(), new ArrayList<>(Collections.singletonList(expectedRole)));
        expectedPairingBoard2.setId(4L);

        Project expectedProject = new Project("Henry", "henrypass", Arrays.asList(expectedPairingBoard1, expectedPairingBoard2), new ArrayList<>());
        expectedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedProject);

        mockMvc.perform(put("/api/project/1/pairingBoard/2/role/3/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(rolePositionDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        verify(mockProjectRepository).findById(1L);
        verify(mockProjectRepository).save(expectedProject);
    }

    @Test
    public void moveRole_whenRolePositionPairingBoardIdIsNull_returnsError() throws Exception {
        Role existingRole = new Role("Ballers");
        existingRole.setId(3L);

        PairingBoard existingPairingBoard1 = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingRole)));
        existingPairingBoard1.setId(2L);

        PairingBoard existingPairingBoard2 = new PairingBoard("Lame Kids", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard2.setId(4L);

        Project existingProject = new Project("Henry", "henrypass", Arrays.asList(existingPairingBoard1, existingPairingBoard2), new ArrayList<>());
        existingProject.setId(1L);

        RolePositionDTO rolePositionDTO = new RolePositionDTO();
        rolePositionDTO.setPairingBoardId(null);

        mockMvc.perform(put("/api/project/1/pairingBoard/2/role/3/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(rolePositionDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.pairingBoardId", equalTo("Where are you trying to go? Roles must be with a pairing board!")));
    }

    @Test
    public void moveRole_whenNoPairingBoardMatchesGivenId_returnsError() throws Exception {
        Role existingRole = new Role("Ballers");
        existingRole.setId(3L);

        PairingBoard existingPairingBoard1 = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingRole)));
        existingPairingBoard1.setId(2L);

        PairingBoard existingPairingBoard2 = new PairingBoard("Lame Kids", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard2.setId(4L);

        Project existingProject = new Project("Henry", "henrypass", Arrays.asList(existingPairingBoard1, existingPairingBoard2), new ArrayList<>());
        existingProject.setId(1L);

        RolePositionDTO rolePositionDTO = new RolePositionDTO();
        rolePositionDTO.setPairingBoardId(4L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));

        mockMvc.perform(put("/api/project/1/pairingBoard/44/role/3/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(rolePositionDTO)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.id", equalTo("Keeaa!? That pairing board doesn't seem to exist.")));

        verify(mockProjectRepository).findById(1L);
    }

    @Test
    public void moveRole_whenNoRoleMatchesGivenId_returnsError() throws Exception {
        Role existingRole = new Role("Ballers");
        existingRole.setId(3L);

        PairingBoard existingPairingBoard1 = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingRole)));
        existingPairingBoard1.setId(2L);

        PairingBoard existingPairingBoard2 = new PairingBoard("Lame Kids", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard2.setId(4L);

        Project existingProject = new Project("Henry", "henrypass", Arrays.asList(existingPairingBoard1, existingPairingBoard2), new ArrayList<>());
        existingProject.setId(1L);

        RolePositionDTO rolePositionDTO = new RolePositionDTO();
        rolePositionDTO.setPairingBoardId(4L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));

        mockMvc.perform(put("/api/project/1/pairingBoard/2/role/77/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(rolePositionDTO)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.id", equalTo("Keeaa!? That role doesn't seem to exist.")));

        verify(mockProjectRepository).findById(1L);
    }

    @Test
    public void moveRole_whenNoPairingBoardMatchesGivenRolePositionPairingBoardId_returnsError() throws Exception {
        Role existingRole = new Role("Ballers");
        existingRole.setId(3L);

        PairingBoard existingPairingBoard1 = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingRole)));
        existingPairingBoard1.setId(2L);

        PairingBoard existingPairingBoard2 = new PairingBoard("Lame Kids", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard2.setId(4L);

        Project existingProject = new Project("Henry", "henrypass", Arrays.asList(existingPairingBoard1, existingPairingBoard2), new ArrayList<>());
        existingProject.setId(1L);

        RolePositionDTO rolePositionDTO = new RolePositionDTO();
        rolePositionDTO.setPairingBoardId(77L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));

        mockMvc.perform(put("/api/project/1/pairingBoard/2/role/3/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(rolePositionDTO)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.pairingBoardId", equalTo("Keeaa!? That pairing board doesn't seem to exist.")));

        verify(mockProjectRepository).findById(1L);
    }

    @Test
    public void deleteRole_removesRoleFromGivenPairingBoardId_andReturnsTheUpdatedProject() throws Exception {
        Role existingRole = new Role("Ballers");
        existingRole.setId(3L);

        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingRole)));
        existingPairingBoard.setId(2L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>());
        existingProject.setId(1L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        PairingBoard expectedPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>());
        expectedPairingBoard.setId(2L);

        Project expectedProject = new Project("Henry", "henrypass", Collections.singletonList(expectedPairingBoard), new ArrayList<>());
        expectedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedProject);

        mockMvc.perform(delete("/api/project/1/pairingBoard/2/role/3"))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        Role expectedDeletedRole = new Role("Ballers");
        expectedDeletedRole.setId(3L);

        verify(mockRoleRepository).delete(expectedDeletedRole);
        verify(mockProjectRepository).findById(1L);
        verify(mockProjectRepository).save(expectedProject);
    }

    @Test
    public void deleteRole_whenNoPairingBoardMatchesGivenId_returnsError() throws Exception {
        Role existingRole = new Role("Ballers");
        existingRole.setId(3L);

        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingRole)));
        existingPairingBoard.setId(2L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>());
        existingProject.setId(1L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));

        mockMvc.perform(delete("/api/project/1/pairingBoard/55/role/3"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.id", equalTo("Keeaa!? That pairing board doesn't seem to exist.")));

        verify(mockProjectRepository).findById(1L);
    }

    @Test
    public void deleteRole_whenNoRoleMatchesGivenId_returnsError() throws Exception {
        Role existingRole = new Role("Ballers");
        existingRole.setId(3L);

        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingRole)));
        existingPairingBoard.setId(2L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>());
        existingProject.setId(1L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));

        mockMvc.perform(delete("/api/project/1/pairingBoard/2/role/77"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.id", equalTo("Keeaa!? That role doesn't seem to exist.")));

        verify(mockProjectRepository).findById(1L);
    }
}
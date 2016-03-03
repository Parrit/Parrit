package com.parrit.repositories;

import com.parrit.entities.Workspace;
import com.parrit.support.SpringTestBase;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class WorkspaceRepositoryTest extends SpringTestBase {

    @Autowired
    WorkspaceRepository workspaceRepository;

    @Test
    public void getAllWorkspaceNames_returnsListOfNamesOfEachWorkspaceInTheDB() throws Exception {
        Workspace workspace1 = new Workspace("Hello", new ArrayList<>(), new ArrayList<>());
        Workspace workspace2 = new Workspace("Cheese", new ArrayList<>(), new ArrayList<>());
        Workspace workspace3 = new Workspace("McCow", new ArrayList<>(), new ArrayList<>());

        workspaceRepository.save(workspace1);
        workspaceRepository.save(workspace2);
        workspaceRepository.save(workspace3);

        List<String> workspaceNames = workspaceRepository.getAllWorkspaceNames();

        assertThat(workspaceNames, equalTo(Arrays.asList("Hello", "Cheese", "McCow")));
    }

}
package com.parrit.controllers;

import com.parrit.repositories.WorkspaceRepository;
import com.parrit.support.ControllerTestBase;
import org.junit.Before;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;

public class DefaultControllerTest extends ControllerTestBase {

    @Mock
    WorkspaceRepository mockWorkspaceRepository;

    @Autowired
    @InjectMocks
    DefaultController mockDefaultController;

    @Before
    public void setUp() {

    }

}

package com.parrit.support;

import org.junit.Before;
import org.mockito.MockitoAnnotations;

public class MockitoTestBase {

    @Before
    public void setupMockitoBase() {
        MockitoAnnotations.initMocks(this);
    }

}

package com.parrit.support;

import com.parrit.ParritApplication;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = ParritApplication.class)
@ActiveProfiles(profiles = "test")
@Transactional
public class SpringTestBase extends MockitoTestBase {
}

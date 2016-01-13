package com.test.parrit;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.parrit.ParritApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ParritApplication.class)
@WebAppConfiguration
public class ParritApplicationTests {

	@Test
	public void contextLoads() {
	}

}

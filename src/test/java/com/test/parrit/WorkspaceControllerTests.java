package com.test.parrit;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertSame;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.fasterxml.jackson.databind.JsonNode;
import com.parrit.ParritApplication;
import com.parrit.Workspace;
import com.parrit.WorkspaceController;
import com.parrit.WorkspaceRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ParritApplication.class)
@WebAppConfiguration
public class WorkspaceControllerTests {

	WorkspaceController subject;
	WorkspaceRepository mockRepo;
	ArgumentCaptor<Workspace> captor = ArgumentCaptor.forClass(Workspace.class);
	JsonNode mockJson;
	String html;
	
	@Before
	public void setUp() throws Exception {
		mockRepo = mock(WorkspaceRepository.class);
		subject = new WorkspaceController(mockRepo);
		
		mockJson = mock(JsonNode.class);
		JsonNode mockHTMLSection = mock(JsonNode.class);
		html = "<div>Dave's Div</div>";
		
		when(mockJson.path("htmlContents")).thenReturn(mockHTMLSection);
		when(mockHTMLSection.asText()).thenReturn(html);
	}

	@Test
	public void callingSaveWithNewData() {
		subject.save(mockJson);
		verify(mockRepo).save(captor.capture());
		Workspace space = captor.getValue();
		assert(space.getHTMLContents().equals(html));
	}
	
	@Test
	public void callingSaveWithOldData() {
		when(mockRepo.count()).thenReturn(1L); //Anything greater than 1
		assert(!subject.retrieve().getHTMLContents().equals(html));
		subject.save(mockJson);
		verify(mockRepo).save(captor.capture());
		Workspace space = captor.getValue();
		assert(space.getHTMLContents().equals(html));
	}
	
	@Test
	public void retrieveWithASavedWorkspace() {
		Workspace mockWorkspace = mock(Workspace.class);
		when(mockRepo.findOne(1L)).thenReturn(mockWorkspace);
		assertSame(subject.retrieve(), mockWorkspace);
	}
	
	@Test
	public void retrieveWithoutSavedWorkspace() {
		when(mockRepo.findOne(1L)).thenReturn(null);
		assertNotNull(subject.retrieve());
	}

}

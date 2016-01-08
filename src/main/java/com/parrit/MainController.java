package com.parrit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	
	@Autowired
	WorkspaceController workspaceController;
	
	@RequestMapping("/index") 
	public String index(Model model) {
		return main(model);
	}
	
	@RequestMapping("/main")
	public String main(Model model) {
		Workspace workspace = workspaceController.retrieve();
		String workspaceHTML = workspace.getHTMLContents();
		model.addAttribute("workspaceHTML", workspaceHTML);
		return "main";
	}
}

package com.parrit;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Workspace {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String htmlContents;
	
	protected Workspace() {}
	
	public Workspace(String htmlContents) {
		this.htmlContents = htmlContents;
	}
}

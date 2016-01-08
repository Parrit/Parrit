package com.parrit;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Workspace {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@Lob
	private String htmlContents;
	
	protected Workspace() {}
	
	public Workspace(String htmlContents) {
		this.htmlContents = htmlContents;
	}
	
	public String getHTMLContents() {
		return this.htmlContents;
	}
	
	public void setHTMLContents(String contents) {
		this.htmlContents = contents;
	}
}

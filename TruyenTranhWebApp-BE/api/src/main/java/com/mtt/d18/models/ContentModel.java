package com.mtt.d18.models;

import javax.persistence.Entity;	
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "content")
public class ContentModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String fileName;

	private int contentIndex;

	@ManyToOne(optional = false)
	@JoinColumn(name = "chapter_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private ChapterModel chapter;

	public ContentModel() {
	}

	public ContentModel(String fileName, int contentIndex) {
		this.fileName = fileName;
		this.contentIndex = contentIndex;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public int getContentIndex() {
		return contentIndex;
	}

	public void setContentIndex(int contentIndex) {
		this.contentIndex = contentIndex;
	}
	
	public ChapterModel getChapter() {
		return chapter;
	}

	public void setChapter(ChapterModel chapter) {
		this.chapter = chapter;
	}
}

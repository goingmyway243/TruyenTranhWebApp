package com.mtt.d18.models;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "chapter")
public class ChapterModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	
	private int chapterIndex;
	
	private long comicId;
	
	@CreatedDate
	private Date createdTime;

	public ChapterModel() {
	}

	public ChapterModel(String name, int chapterIndex, long comicId) {
		this.name = name;
		this.chapterIndex = chapterIndex;
		this.comicId = comicId;
	}

	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getChapterIndex() {
		return chapterIndex;
	}

	public void setChapterIndex(int chapterIndex) {
		this.chapterIndex = chapterIndex;
	}

	public long getComicId() {
		return comicId;
	}

	public void setComicId(long comicId) {
		this.comicId = comicId;
	}

	public Date getCreatedTime() {
		return createdTime;
	}
}

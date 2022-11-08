package com.mtt.d18.models;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
	
	@Column(name = "comic_id")
	private long comicId;
	
	@CreatedDate
	private LocalDateTime createdTime;

	@ManyToOne(optional = false)
    @JoinColumn(name = "comic_id", insertable = false, updatable = false)
    private ComicModel comic;

	public ChapterModel() {
	}

	public ChapterModel(String name, int chapterIndex, long comicId) {
		this.name = name;
		this.chapterIndex = chapterIndex;
		this.comicId = comicId;
		this.createdTime = LocalDateTime.now();
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

	public LocalDateTime getCreatedTime() {
		return createdTime;
	}
	
	public ComicModel getComic() {
		return comic;
	}

	public void setComic(ComicModel comic) {
		this.comic = comic;
	}
}

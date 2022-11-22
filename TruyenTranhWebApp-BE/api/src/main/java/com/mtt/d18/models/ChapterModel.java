package com.mtt.d18.models;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "chapter")
public class ChapterModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;

	private int chapterIndex;

	@CreatedDate
	private LocalDateTime createdTime;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "comic_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private ComicModel comic;

	@OneToMany(mappedBy = "chapter")
	@Fetch(FetchMode.JOIN)
	@JsonIgnore
	private Set<ContentModel> contents = new HashSet<>();
	
	@OneToMany(mappedBy = "chapter")
	@Fetch(FetchMode.JOIN)
	@JsonIgnore
	private Set<CommentModel> comments = new HashSet<>();

	public ChapterModel() {
	}

	public ChapterModel(String name, int chapterIndex) {
		this.name = name;
		this.chapterIndex = chapterIndex;
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

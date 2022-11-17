package com.mtt.d18.models;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.annotation.CreatedDate;

import com.mtt.d18.enums.StatusType;

@Entity
@Table(name = "comic")
public class ComicModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;

	private String title;

	private String description;

	private long view;
	
	private long userId;
	
	private long authorId;

	@Enumerated(EnumType.STRING)
	private StatusType status;

	@CreatedDate
	private LocalDateTime createdTime;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.MERGE })
	@JoinTable(name = "comic_genre", joinColumns = @JoinColumn(name = "comic_id"), inverseJoinColumns = @JoinColumn(name = "genre_id"))
	private Set<GenreModel> genres = new HashSet<>();

	@OneToMany(mappedBy = "comic", fetch = FetchType.EAGER)
	private Set<ChapterModel> chapters = new HashSet<>();
	
	@OneToMany(mappedBy = "comic")
	@Fetch(FetchMode.JOIN)
	private Set<ReviewModel> reviews;

	public ComicModel() {
	}

	public ComicModel(String title, String description, long view, long userId, long authorId, StatusType status) {
		this.title = title;
		this.description = description;
		this.view = view;
		this.userId = userId;
		this.authorId = authorId;
		this.status = status;
		this.createdTime = LocalDateTime.now();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getView() {
		return view;
	}

	public void setView(long view) {
		this.view = view;
	}
	
	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getAuthorId() {
		return authorId;
	}

	public void setAuthorId(long authorId) {
		this.authorId = authorId;
	}

	public StatusType getStatus() {
		return status;
	}

	public void setStatus(StatusType status) {
		this.status = status;
	}

	public LocalDateTime getCreatedTime() {
		return createdTime;
	}

	public Set<GenreModel> getGenres() {
		return genres;
	}

	public void setGenres(Set<GenreModel> genres) {
		this.genres = genres;
	}

	public Set<ChapterModel> getChapters() {
		return chapters;
	}

	public void setChapters(Set<ChapterModel> chapters) {
		this.chapters = chapters;
	}

	public Set<ReviewModel> getReviews() {
		return reviews;
	}

	public void setReviews(Set<ReviewModel> reviews) {
		this.reviews = reviews;
	}
}

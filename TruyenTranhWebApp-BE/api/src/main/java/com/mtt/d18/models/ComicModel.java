package com.mtt.d18.models;

import java.sql.Date;
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
import javax.persistence.Table;

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

	@Enumerated(EnumType.STRING)
	private StatusType status;

	private long userId;

	private long authorId;

	@CreatedDate
	private Date createdTime;

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "comic_genre", joinColumns = @JoinColumn(name = "comic_id"), inverseJoinColumns = @JoinColumn(name = "genre_id"))
	private Set<GenreModel> genres = new HashSet<>();

	public ComicModel() {
	}

	public ComicModel(String title, String description, long view, StatusType status, long userId, long authorId) {
		this.title = title;
		this.description = description;
		this.view = view;
		this.status = status;
		this.userId = userId;
		this.authorId = authorId;
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

	public StatusType getStatus() {
		return status;
	}

	public void setStatus(StatusType status) {
		this.status = status;
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

	public Date getCreatedTime() {
		return createdTime;
	}

	public Set<GenreModel> getGenres() {
		return genres;
	}

	public void setGenres(Set<GenreModel> genres) {
		this.genres = genres;
	}

	public void addGenre(GenreModel genre) {
		this.genres.add(genre);
		genre.getComics().add(this);
	}

	public void removeGenre(GenreModel genre) {
		this.genres.remove(genre);
		genre.getComics().remove(this);
	}
}

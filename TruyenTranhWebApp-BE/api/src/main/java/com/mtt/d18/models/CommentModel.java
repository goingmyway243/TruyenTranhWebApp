package com.mtt.d18.models;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "comment")
public class CommentModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String comment;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private UserModel user;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "chapter_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private ChapterModel chapter;
	
	@CreatedDate
	private LocalDateTime createdTime;

	public CommentModel() {
	}

	public CommentModel(String comment) {
		this.comment = comment;
		this.createdTime = LocalDateTime.now();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public LocalDateTime getCreatedTime() {
		return createdTime;
	}

	public UserModel getUser() {
		return user;
	}

	public void setUser(UserModel user) {
		this.user = user;
	}

	public ChapterModel getChapter() {
		return chapter;
	}

	public void setChapter(ChapterModel chapter) {
		this.chapter = chapter;
	}
}

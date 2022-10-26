package com.mtt.d18.models;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "comment")
public class CommentModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String comment;
	
	private long userId;
	
	private long chapterId;
	
	@CreatedDate
	private LocalDateTime createdTime;

	public CommentModel() {
	}

	public CommentModel(String comment, long userId, long chapterId) {
		this.comment = comment;
		this.userId = userId;
		this.chapterId = chapterId;
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

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getChapterId() {
		return chapterId;
	}

	public void setChapterId(long chapterId) {
		this.chapterId = chapterId;
	}

	public LocalDateTime getCreatedTime() {
		return createdTime;
	}
}

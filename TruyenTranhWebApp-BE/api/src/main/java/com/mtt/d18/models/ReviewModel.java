package com.mtt.d18.models;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import com.mtt.d18.enums.ReviewType;

@Entity
@Table(name = "review")
@IdClass(ReviewModel.class)
public class ReviewModel {
	@Id
	private long userId;
	
	@Id
	private long comicId;
	
	@Enumerated(EnumType.STRING)
	private ReviewType type;
	
	@CreatedDate
	private Date createdTime;

	public ReviewModel() {
	}

	public ReviewModel(long userId, long comicId, ReviewType type) {
		this.userId = userId;
		this.comicId = comicId;
		this.type = type;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getComicId() {
		return comicId;
	}

	public void setComicId(long comicId) {
		this.comicId = comicId;
	}

	public ReviewType getType() {
		return type;
	}

	public void setType(ReviewType type) {
		this.type = type;
	}

	public Date getCreatedTime() {
		return createdTime;
	}
}

package com.mtt.d18.models;

import java.time.LocalDateTime;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import com.mtt.d18.enums.ReviewType;
import com.mtt.d18.identity.ReviewIdentity;

@Entity
@Table(name = "review")
public class ReviewModel {
	@EmbeddedId
	private ReviewIdentity reviewId;
	
	@Enumerated(EnumType.STRING)
	private ReviewType type;
	
	@CreatedDate
	private LocalDateTime createdTime;

	public ReviewModel() {
	}


	public ReviewModel(ReviewIdentity reviewId, ReviewType type) {
		super();
		this.reviewId = reviewId;
		this.type = type;
		this.createdTime = LocalDateTime.now();
	}


	public ReviewIdentity getReviewId() {
		return reviewId;
	}

	public void setReviewId(ReviewIdentity reviewId) {
		this.reviewId = reviewId;
	}

	public ReviewType getType() {
		return type;
	}

	public void setType(ReviewType type) {
		this.type = type;
	}

	public LocalDateTime getCreatedTime() {
		return createdTime;
	}
}

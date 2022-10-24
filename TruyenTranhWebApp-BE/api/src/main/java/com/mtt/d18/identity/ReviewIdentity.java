package com.mtt.d18.identity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class ReviewIdentity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "user_id")
	private Long userId;

	@Column(name = "comic_id")
	private Long comicId;

	public ReviewIdentity() {
	}

	public ReviewIdentity(long userId, long comicId) {
		this.userId = userId;
		this.comicId = comicId;
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

	@Override
	public int hashCode() {
		return Objects.hash(userId, comicId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (obj == null || getClass() != obj.getClass()) {
			return false;
		}

		ReviewIdentity indentity = (ReviewIdentity) obj;

		return userId.equals(indentity.userId) && comicId.equals(indentity.comicId);
	}
}

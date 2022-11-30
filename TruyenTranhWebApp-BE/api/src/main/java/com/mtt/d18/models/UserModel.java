package com.mtt.d18.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mtt.d18.enums.RoleType;

@Entity
@Table(name = "user")
public class UserModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	
	@Column(unique = true)
	private String email;
	
	private String pass;
	
	@Enumerated(EnumType.STRING)
	private RoleType role;
	
	private boolean isDeleted;
	
	@OneToMany(mappedBy = "user")
	@Fetch(FetchMode.JOIN)
	@JsonIgnore
	private Set<ComicModel> comics;
	
	@OneToMany(mappedBy = "user")
	@Fetch(FetchMode.JOIN)
	@JsonIgnore
	private Set<ReviewModel> reviews;
	
	@OneToMany(mappedBy = "user")
	@Fetch(FetchMode.JOIN)
	@JsonIgnore
	private Set<CommentModel> comments;
	
	public UserModel() {
	}

	public UserModel(String name, String email, String pass, RoleType role) {
		this.name = name;
		this.email = email;
		this.pass = pass;
		this.role = role;
		this.isDeleted = false;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public RoleType getRole() {
		return role;
	}

	public void setRole(RoleType role) {
		this.role = role;
	}

	public boolean getIsDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Set<ReviewModel> getReviews() {
		return reviews;
	}

	public void setReviews(Set<ReviewModel> reviews) {
		this.reviews = reviews;
	}

	public Set<ComicModel> getComics() {
		return comics;
	}

	public void setComics(Set<ComicModel> comics) {
		this.comics = comics;
	}

	public Set<CommentModel> getComments() {
		return comments;
	}

	public void setComments(Set<CommentModel> comments) {
		this.comments = comments;
	}
}

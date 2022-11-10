package com.mtt.d18.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "author")
public class AuthorModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;

	@OneToMany(mappedBy = "author", fetch = FetchType.EAGER)
	private Set<ComicModel> comics = new HashSet<>();
	
	public AuthorModel() {
	}

	public AuthorModel(String name) {
		this.name = name;
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

	public Set<ComicModel> getComics() {
		return comics;
	}

	public void setComics(Set<ComicModel> comics) {
		this.comics = comics;
	}
}

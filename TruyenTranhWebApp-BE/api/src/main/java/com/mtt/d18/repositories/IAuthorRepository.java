package com.mtt.d18.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtt.d18.models.AuthorModel;

public interface IAuthorRepository extends JpaRepository<AuthorModel, Long>{
	AuthorModel findByNameIgnoreCase(String name);
}

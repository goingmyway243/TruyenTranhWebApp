package com.mtt.d18.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtt.d18.models.GenreModel;

public interface IGenreRepository extends JpaRepository<GenreModel, Long>{
	List<GenreModel> findGenresByComicsId(long comicId);
	GenreModel findByNameIgnoreCase(String name);
}

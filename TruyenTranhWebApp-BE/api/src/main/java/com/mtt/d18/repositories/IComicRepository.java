package com.mtt.d18.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtt.d18.models.ComicModel;

public interface IComicRepository extends JpaRepository<ComicModel, Long> {
	List<ComicModel> findByOrderByCreatedTimeDesc();
	List<ComicModel> findByTitleContaining(String title);
	List<ComicModel> findComicsByGenresId(long genreId);
}

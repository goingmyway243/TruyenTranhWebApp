package com.mtt.d18.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtt.d18.models.ComicModel;
import com.mtt.d18.models.UserModel;

public interface IComicRepository extends JpaRepository<ComicModel, Long> {
	List<ComicModel> findByOrderByCreatedTimeDesc();
	List<ComicModel> findByTitleContainingOrderByCreatedTimeDesc(String title);
	List<ComicModel> findComicsByGenresId(long genreId);
	List<ComicModel> findByUserOrderByCreatedTimeDesc(UserModel user);
}

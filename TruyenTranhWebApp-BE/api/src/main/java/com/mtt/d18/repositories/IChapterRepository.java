package com.mtt.d18.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mtt.d18.models.ChapterModel;

public interface IChapterRepository extends JpaRepository<ChapterModel, Long>{
	@Query("SELECT c FROM ChapterModel c WHERE c.chapterIndex=?1 AND c.comicId=?2")
	ChapterModel findyByChapterIndexAndComicId(int chapterIndex, long comicId);
}

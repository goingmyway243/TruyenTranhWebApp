package com.mtt.d18.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtt.d18.models.ChapterModel;
import com.mtt.d18.models.ContentModel;

public interface IContentRepository extends JpaRepository<ContentModel, Long>{
	List<ContentModel> findByChapter(ChapterModel chapterModel);
}

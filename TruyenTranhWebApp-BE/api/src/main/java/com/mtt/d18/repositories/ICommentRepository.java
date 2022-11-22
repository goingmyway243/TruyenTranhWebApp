package com.mtt.d18.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtt.d18.models.ChapterModel;
import com.mtt.d18.models.CommentModel;

public interface ICommentRepository extends JpaRepository<CommentModel, Long>{
	List<CommentModel> findByChapterOrderByCreatedTimeDesc(ChapterModel chapterModel);
}

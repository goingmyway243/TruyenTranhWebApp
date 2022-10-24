package com.mtt.d18.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtt.d18.models.CommentModel;

public interface ICommentRepository extends JpaRepository<CommentModel, Long>{

}

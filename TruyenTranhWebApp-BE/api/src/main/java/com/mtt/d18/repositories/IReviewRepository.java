package com.mtt.d18.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtt.d18.identity.ReviewIdentity;
import com.mtt.d18.models.ReviewModel;

public interface IReviewRepository extends JpaRepository<ReviewModel, ReviewIdentity>{
	List<ReviewModel> findByReviewIdComicId(long id);
}

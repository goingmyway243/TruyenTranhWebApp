package com.mtt.d18.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtt.d18.identity.ReviewIdentity;
import com.mtt.d18.models.ReviewModel;
import com.mtt.d18.repositories.IReviewRepository;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/reviews")
public class ReviewController {
	@Autowired
	private IReviewRepository reviewRepo;

	@GetMapping
	public ResponseEntity<List<ReviewModel>> getAll() {
		List<ReviewModel> reviews = new ArrayList<>();
		
		reviewRepo.findAll().forEach(reviews::add);
		
		if(reviews.isEmpty())
		{
			return new ResponseEntity<List<ReviewModel>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<ReviewModel>>(reviews, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<ReviewModel> create(@RequestBody ReviewModel reviewModel) {
		ReviewModel newReview = new ReviewModel(reviewModel.getReviewId(), reviewModel.getType());
		newReview.setComic(reviewModel.getComic());
		newReview.setUser(reviewModel.getUser());
		
		return new ResponseEntity<ReviewModel>(reviewRepo.save(newReview), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable ReviewIdentity id) {
		reviewRepo.deleteById(id);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}

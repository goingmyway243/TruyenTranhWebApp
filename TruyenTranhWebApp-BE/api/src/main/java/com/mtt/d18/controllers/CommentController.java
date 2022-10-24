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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtt.d18.models.CommentModel;
import com.mtt.d18.repositories.ICommentRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/comments")
public class CommentController {
	@Autowired
	private ICommentRepository commentRepo;

	@GetMapping
	public ResponseEntity<List<CommentModel>> getAll() {
		List<CommentModel> comments = new ArrayList<>();
		
		commentRepo.findAll().forEach(comments::add);
		
		if(comments.isEmpty())
		{
			return new ResponseEntity<List<CommentModel>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<CommentModel>>(comments, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<CommentModel> getById(@PathVariable long id) {
		return commentRepo.findById(id).map(comment -> new ResponseEntity<CommentModel>(comment, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<CommentModel>(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	public ResponseEntity<CommentModel> create(@RequestBody CommentModel commentModel) {
		CommentModel newComment = new CommentModel(commentModel.getComment(), commentModel.getUserId(), commentModel.getChapterId());
		return new ResponseEntity<CommentModel>(commentRepo.save(newComment), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<CommentModel> update(@PathVariable long id, @RequestBody CommentModel commentModel) {
		return commentRepo.findById(id).map(comment -> {
			commentModel.setId(comment.getId());
			return new ResponseEntity<CommentModel>(commentRepo.save(commentModel), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<CommentModel>(HttpStatus.NOT_FOUND));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable long id) {
		commentRepo.deleteById(id);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}

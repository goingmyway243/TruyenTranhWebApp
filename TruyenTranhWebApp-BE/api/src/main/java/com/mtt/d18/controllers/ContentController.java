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

import com.mtt.d18.models.ContentModel;
import com.mtt.d18.repositories.IContentRepository;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/contents")
public class ContentController {
	@Autowired
	private IContentRepository contentRepo;

	@GetMapping
	public ResponseEntity<List<ContentModel>> getAll() {
		List<ContentModel> contents = new ArrayList<>();
		
		contentRepo.findAll().forEach(contents::add);
		
		if(contents.isEmpty())
		{
			return new ResponseEntity<List<ContentModel>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<ContentModel>>(contents, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ContentModel> getById(@PathVariable long id) {
		return contentRepo.findById(id).map(content -> new ResponseEntity<ContentModel>(content, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<ContentModel>(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	public ResponseEntity<ContentModel> create(@RequestBody ContentModel contentModel) {
		ContentModel newContent = new ContentModel(contentModel.getFileName(), contentModel.getContentIndex(), contentModel.getChapterId());
		return new ResponseEntity<ContentModel>(contentRepo.save(newContent), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ContentModel> update(@PathVariable long id, @RequestBody ContentModel contentModel) {
		return contentRepo.findById(id).map(content -> {
			contentModel.setId(content.getId());
			return new ResponseEntity<ContentModel>(contentRepo.save(contentModel), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<ContentModel>(HttpStatus.NOT_FOUND));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable long id) {
		contentRepo.deleteById(id);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}
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

import com.mtt.d18.models.AuthorModel;
import com.mtt.d18.repositories.IAuthorRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/authors")
public class AuthorController {
	@Autowired
	private IAuthorRepository authorRepo;

	@GetMapping
	public ResponseEntity<List<AuthorModel>> getAll() {
		List<AuthorModel> authors = new ArrayList<>();

		authorRepo.findAll().forEach(authors::add);

		if (authors.isEmpty()) {
			return new ResponseEntity<List<AuthorModel>>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<List<AuthorModel>>(authors, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<AuthorModel> getById(@PathVariable long id) {
		return authorRepo.findById(id).map(author -> new ResponseEntity<AuthorModel>(author, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<AuthorModel>(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	public ResponseEntity<AuthorModel> create(@RequestBody AuthorModel authorModel) {
		AuthorModel newAuthor = authorRepo.findByNameIgnoreCase(authorModel.getName());
		if (newAuthor != null) {
			return new ResponseEntity<AuthorModel>(HttpStatus.NOT_MODIFIED);
		}
		
		newAuthor = new AuthorModel(authorModel.getName());
		return new ResponseEntity<AuthorModel>(authorRepo.save(newAuthor), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<AuthorModel> update(@PathVariable long id, @RequestBody AuthorModel authorModel) {
		return authorRepo.findById(id).map(author -> {
			authorModel.setId(author.getId());
			return new ResponseEntity<AuthorModel>(authorRepo.save(authorModel), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<AuthorModel>(HttpStatus.NOT_FOUND));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable long id) {
		authorRepo.deleteById(id);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}

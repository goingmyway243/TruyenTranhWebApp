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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mtt.d18.models.ComicModel;
import com.mtt.d18.repositories.IComicRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/comics")
public class ComicController {
	@Autowired
	private IComicRepository comicRepo;

	@GetMapping
	public ResponseEntity<List<ComicModel>> getAll(@RequestParam(required = false) String title) {
		List<ComicModel> comics = new ArrayList<>();

		if (title != null) {
			comicRepo.findAll().forEach(comics::add);
		} else {
			comicRepo.findByTitleContaining(title).forEach(comics::add);
		}

		if (comics.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(comics, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ComicModel> getById(@PathVariable("id") long id) {
		return comicRepo.findById(id).map(comic -> new ResponseEntity<>(comic, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	public ResponseEntity<ComicModel> create(@RequestBody ComicModel comicModel) {
		ComicModel newComic = new ComicModel(comicModel.getTitle(), comicModel.getDescription(), 0, comicModel.getStatus(),
				comicModel.getUserId(), comicModel.getAuthorId());
		return new ResponseEntity<ComicModel>(comicRepo.save(newComic), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ComicModel> update(@PathVariable("id") long id, @RequestBody ComicModel comicModel) {
		return comicRepo.findById(id).map(comic -> {
			comicModel.setId(comic.getId());
			return new ResponseEntity<>(comicRepo.save(comicModel), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id){
		comicRepo.deleteById(id);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}

package com.mtt.d18.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
			return new ResponseEntity<List<ComicModel>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<ComicModel>>(comics, HttpStatus.OK);
		}
	}
}

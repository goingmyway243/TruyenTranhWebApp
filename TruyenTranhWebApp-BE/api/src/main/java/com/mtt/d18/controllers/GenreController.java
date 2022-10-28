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

import com.mtt.d18.models.ComicModel;
import com.mtt.d18.models.GenreModel;
import com.mtt.d18.repositories.IComicRepository;
import com.mtt.d18.repositories.IGenreRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/genres")
public class GenreController {
	@Autowired
	private IGenreRepository genreRepo;
	
	@Autowired
	private IComicRepository comicRepo;
	
	@GetMapping
	public ResponseEntity<List<GenreModel>> getAll(){
		List<GenreModel> genres = new ArrayList<>();
		
		genreRepo.findAll().forEach(genres::add);
		
		if(genres.isEmpty())
		{
			return new ResponseEntity<List<GenreModel>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<GenreModel>>(genres, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<GenreModel> getById(@PathVariable("id") long id){
		return genreRepo.findById(id).map(genre -> new ResponseEntity<>(genre, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping("/{id}/comics")
	public ResponseEntity<List<ComicModel>> getAllComicsByGenreId(@PathVariable("id") long id){
		if(!genreRepo.existsById(id))
		{
			return new ResponseEntity<List<ComicModel>>(HttpStatus.NOT_FOUND);
		}
		
		List<ComicModel> comics = comicRepo.findComicsByGenresId(id);
		return new ResponseEntity<List<ComicModel>>(comics, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<GenreModel> create(@RequestBody GenreModel genreModel) {
		GenreModel newGenre = genreRepo.findByNameIgnoreCase(genreModel.getName());
		if (newGenre != null) {
			return new ResponseEntity<GenreModel>(HttpStatus.NOT_MODIFIED);
		}
		
		newGenre = new GenreModel(genreModel.getName());
		return new ResponseEntity<GenreModel>(genreRepo.save(newGenre), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<GenreModel> update(@PathVariable("id") long id, @RequestBody GenreModel genreModel) {
		return genreRepo.findById(id).map(genre -> {
			genreModel.setId(genre.getId());
			return new ResponseEntity<>(genreRepo.save(genreModel), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id){
		genreRepo.deleteById(id);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}

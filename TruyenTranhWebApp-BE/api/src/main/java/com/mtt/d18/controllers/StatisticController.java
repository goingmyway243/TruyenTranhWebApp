package com.mtt.d18.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtt.d18.repositories.IAuthorRepository;
import com.mtt.d18.repositories.IComicRepository;
import com.mtt.d18.repositories.IGenreRepository;
import com.mtt.d18.repositories.IUserRepository;
import com.mtt.d18.response.StatisticModel;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/statistic")
public class StatisticController {
	@Autowired
	IUserRepository userRepo;
	
	@Autowired
	IComicRepository comicRepo;
	
	@Autowired
	IGenreRepository genreRepo;
	
	@Autowired
	IAuthorRepository authorRepo;
	
	@GetMapping
	public ResponseEntity<StatisticModel> getReport(){
		StatisticModel statistic = new StatisticModel();
		statistic.setTotalUser(userRepo.count());
		statistic.setTotalComic(comicRepo.count());
		statistic.setTotalGenre(genreRepo.count());
		statistic.setTotalAuthor(authorRepo.count());
		
		return new ResponseEntity<StatisticModel>(statistic, HttpStatus.OK);
	}
}

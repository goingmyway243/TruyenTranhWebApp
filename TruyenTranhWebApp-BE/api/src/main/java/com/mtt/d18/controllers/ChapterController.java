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

import com.mtt.d18.models.ChapterModel;
import com.mtt.d18.repositories.IChapterRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/chapters")
public class ChapterController {
	@Autowired
	private IChapterRepository chapterRepo;

	@GetMapping
	public ResponseEntity<List<ChapterModel>> getAll() {
		List<ChapterModel> chapters = new ArrayList<>();
		
		chapterRepo.findAll().forEach(chapters::add);
		
		if(chapters.isEmpty())
		{
			return new ResponseEntity<List<ChapterModel>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<ChapterModel>>(chapters, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ChapterModel> getById(@PathVariable long id) {
		return chapterRepo.findById(id).map(chapter -> new ResponseEntity<ChapterModel>(chapter, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<ChapterModel>(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	public ResponseEntity<ChapterModel> create(@RequestBody ChapterModel chapterModel) {
		ChapterModel newChapter = new ChapterModel(chapterModel.getName(), chapterModel.getChapterIndex(), chapterModel.getComicId());
		return new ResponseEntity<ChapterModel>(chapterRepo.save(newChapter), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ChapterModel> update(@PathVariable long id, @RequestBody ChapterModel chapterModel) {
		return chapterRepo.findById(id).map(chapter -> {
			chapterModel.setId(chapter.getId());
			return new ResponseEntity<ChapterModel>(chapterRepo.save(chapterModel), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<ChapterModel>(HttpStatus.NOT_FOUND));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable long id) {
		chapterRepo.deleteById(id);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}

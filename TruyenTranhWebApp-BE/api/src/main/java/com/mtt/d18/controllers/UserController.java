package com.mtt.d18.controllers;

import java.util.Optional;

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

import com.mtt.d18.models.UserModel;
import com.mtt.d18.services.IUserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {
	@Autowired
	private IUserService userService;

	@GetMapping
	public ResponseEntity<Iterable<UserModel>> getAll(){
		return new ResponseEntity<Iterable<UserModel>>(userService.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserModel> getById(@PathVariable long id)
	{
		Optional<UserModel> userOptional = userService.findById(id);
		return userOptional.map(user -> new ResponseEntity<UserModel>(user, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping
	public ResponseEntity<UserModel> create(@RequestBody UserModel userModel)
	{
		return new ResponseEntity<UserModel>(userService.save(userModel), HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<UserModel> update(@PathVariable long id, @RequestBody UserModel userModel)
	{
		Optional<UserModel> userOptional = userService.findById(id);
		return userOptional.map(user -> {
			userModel.setId(user.getId());
			return new ResponseEntity<UserModel>(userService.save(userModel), HttpStatus.OK);
		}) .orElseGet(()-> new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<UserModel> delete(@PathVariable long id)
	{
		Optional<UserModel> userOptional = userService.findById(id);
		return userOptional.map(user -> {
			userService.remove(id);
			return new ResponseEntity<UserModel>(user, HttpStatus.OK);
		}) .orElseGet(()-> new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND));
	}
}

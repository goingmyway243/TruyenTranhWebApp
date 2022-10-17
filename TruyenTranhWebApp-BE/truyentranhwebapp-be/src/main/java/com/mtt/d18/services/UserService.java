package com.mtt.d18.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtt.d18.models.UserModel;
import com.mtt.d18.repositories.IUserRepository;

@Service
public class UserService implements IUserService {
	@Autowired
	private IUserRepository userRepo;

	public Iterable<UserModel> findAll() {
		// TODO Auto-generated method stub
		return userRepo.findAll();
	}

	public Optional<UserModel> findById(String id) {
		// TODO Auto-generated method stub
		return userRepo.findById(id);
	}

	public UserModel save(UserModel t) {
		// TODO Auto-generated method stub
		return userRepo.save(t);
	}

	public void remove(String id) {
		// TODO Auto-generated method stub
		userRepo.deleteById(id);
	}

}

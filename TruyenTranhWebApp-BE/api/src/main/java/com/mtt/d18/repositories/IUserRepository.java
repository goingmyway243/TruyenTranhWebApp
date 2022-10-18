package com.mtt.d18.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtt.d18.models.UserModel;

@Repository
public interface IUserRepository extends JpaRepository<UserModel, String> {

}

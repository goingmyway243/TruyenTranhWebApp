package com.mtt.d18.services;

import java.util.Optional;

public interface IGeneralService<T> {
	Iterable<T> findAll();

	Optional<T> findById(String id);

	T save(T t);

	void remove(String id);
}

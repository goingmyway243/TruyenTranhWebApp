package com.mtt.d18.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtt.d18.models.ContentModel;

public interface IContentRepository extends JpaRepository<ContentModel, Long>{

}

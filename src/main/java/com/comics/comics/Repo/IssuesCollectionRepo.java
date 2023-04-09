package com.comics.comics.Repo;

import com.comics.comics.Model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssuesCollectionRepo extends JpaRepository<Issue, Integer> {
}

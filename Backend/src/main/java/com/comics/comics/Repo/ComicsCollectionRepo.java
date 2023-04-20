package com.comics.comics.Repo;

import com.comics.comics.Model.Comic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ComicsCollectionRepo extends JpaRepository<Comic, Integer> {
    @Query("FROM Comic WHERE issuesNr > ?1")
    public List<Comic> filterByIssuesNr(Integer nr);
}

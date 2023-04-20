package com.comics.comics.Repo;

import com.comics.comics.Model.Character;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharactersCollectionRepo extends JpaRepository<Character, Integer> {
}

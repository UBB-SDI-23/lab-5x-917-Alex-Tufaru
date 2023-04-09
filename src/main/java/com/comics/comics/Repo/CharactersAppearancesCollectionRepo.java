package com.comics.comics.Repo;

import com.comics.comics.Model.CharacterAppearances;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharactersAppearancesCollectionRepo extends JpaRepository<CharacterAppearances, Integer> {
}

package com.comics.comics.Controller;

import com.comics.comics.Model.CharacterAppearances;
import com.comics.comics.Repo.CharactersAppearancesCollectionRepo;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:80")
@RequestMapping("/api/appearances")
public class CharactersAppearancesController {
    private final CharactersAppearancesCollectionRepo repo;

    public CharactersAppearancesController(CharactersAppearancesCollectionRepo repo) {
        this.repo = repo;
    }

    @GetMapping("")
    public List<Integer> findAll() {
        List<Integer> IdList = new ArrayList<>();
        for (CharacterAppearances ca : repo.findAll()) {
            IdList.add(ca.getId());
        }
        return IdList;
    }

    @GetMapping("/{id}")
    public CharacterAppearances findById(@PathVariable Integer id) {
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appearance not found"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void create(@RequestBody CharacterAppearances characterAppearances) {
        repo.save(characterAppearances);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void update(@RequestBody CharacterAppearances characterAppearances, @PathVariable Integer id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Character not found");
        }
        repo.deleteById(id);
        repo.save(characterAppearances);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repo.deleteById(id);
    }
}

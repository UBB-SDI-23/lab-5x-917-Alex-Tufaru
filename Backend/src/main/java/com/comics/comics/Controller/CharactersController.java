package com.comics.comics.Controller;

import com.comics.comics.DTO.CharacterAndAvgPageCount;
import com.comics.comics.Model.Character;
import com.comics.comics.Repo.CharactersCollectionRepo;
import com.comics.comics.Service.Service;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:80")
@RequestMapping("/api/characters")
public class CharactersController {
    private final CharactersCollectionRepo repo;
    private final Service service;

    public CharactersController(CharactersCollectionRepo repo, Service service) {
        this.repo = repo;
        this.service = service;
    }

    @GetMapping("")
    public List<Integer> findAll() {
        List<Integer> IdList = new ArrayList<>();
        for (Character c : repo.findAll()) {
            IdList.add(c.getId());
        }
        return IdList;
    }

    @GetMapping("/{id}")
    public Character findById(@PathVariable Integer id) {
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Character not found"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void create(@RequestBody Character character) {
        repo.save(character);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void update(@RequestBody Character character, @Valid @PathVariable Integer id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Character not found");
        }
        repo.deleteById(id);
        repo.save(character);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repo.deleteById(id);
    }

    @GetMapping("/statistic")
    public List<CharacterAndAvgPageCount> getStatistic() {
        return service.ProtagonistsSortedByAvgPageCount();
    }
}

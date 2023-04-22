package com.comics.comics.Controller;

import com.comics.comics.Model.Comic;
import com.comics.comics.Repo.ComicsCollectionRepo;
import com.comics.comics.Service.Service;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/comics")
public class ComicsController {
    private final ComicsCollectionRepo repo;
    private final Service service;

    public ComicsController(ComicsCollectionRepo repo, Service service) {
        this.repo = repo;
        this.service = service;
    }

    @GetMapping("")
    public List<Comic> findAll() {
//        List<Integer> IdList = new ArrayList<>();
//        for (Comic c : repo.findAll())
//            IdList.add(c.getId());
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Comic findById(@PathVariable Integer id) {
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comic not found"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void create(@Valid @RequestBody Comic comic) {
        repo.save(comic);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void update(@RequestBody Comic comic, @PathVariable Integer id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comic not found");
        }
        repo.deleteById(id);
        repo.save(comic);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repo.deleteById(id);
    }

    @GetMapping("/filter/{nr}")
    public List<Comic> filterByIssuesNr(@PathVariable Integer nr) {
        return repo.filterByIssuesNr(nr);
    }

    @PostMapping("/{id}/issues")
    public void addIssuesList(@PathVariable Integer id, @RequestBody List<Integer> issues){
        service.addIssuesListToComic(id, issues);
    }
}

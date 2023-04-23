package com.comics.comics.Controller;

import com.comics.comics.Model.Comic;
import com.comics.comics.Model.Issue;
import com.comics.comics.Repo.ComicsCollectionRepo;
import com.comics.comics.Repo.IssuesCollectionRepo;
import com.comics.comics.Service.Service;
import jakarta.validation.Valid;
import org.hibernate.Session;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/comics")
public class ComicsController {
    private static Session session;
    private final ComicsCollectionRepo comicsRepo;
    private final IssuesCollectionRepo issuesRepo;
    private final Service service;

    public ComicsController(ComicsCollectionRepo comicsRepo, IssuesCollectionRepo issuesRepo, Service service) {
        this.comicsRepo = comicsRepo;
        this.issuesRepo = issuesRepo;
        this.service = service;
    }

    @GetMapping("")
    public List<Comic> findAll() {
//        List<Integer> IdList = new ArrayList<>();
//        for (Comic c : repo.findAll())
//            IdList.add(c.getId());
        return comicsRepo.findAll();
    }

    @GetMapping("/{id}")
    public Comic findById(@PathVariable Integer id) {
        return comicsRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comic not found"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void create(@Valid @RequestBody Comic comic) {
        comicsRepo.save(comic);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void update(@RequestBody Comic comic, @PathVariable Integer id) {
        if (!comicsRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comic not found");
        }
        this.delete(id);
        this.create(comic);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        Comic comic = comicsRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comic not found"));
        for (Issue issue : comic.getIssues()){
            issue.setSeries(null);
        }
        comic.setIssues(new ArrayList<>());
        comicsRepo.deleteById(id);
    }

    @GetMapping("/filter/{nr}")
    public List<Comic> filterByIssuesNr(@PathVariable Integer nr) {
        return comicsRepo.filterByIssuesNr(nr);
    }

    @PostMapping("/{id}/issues")
    public void addIssuesList(@PathVariable Integer id, @RequestBody List<Integer> issues){
        service.addIssuesListToComic(id, issues);
    }
}

package com.comics.comics.Controller;

import com.comics.comics.DTO.IssuesWithCharacters;
import com.comics.comics.Model.Issue;
import com.comics.comics.Repo.IssuesCollectionRepo;
import com.comics.comics.Service.Service;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:80")
@RequestMapping("/api/issues")
public class IssuesController {
    private final IssuesCollectionRepo repo;
    private final Service service;
    public IssuesController(IssuesCollectionRepo repo, Service service) {
        this.repo = repo;
        this.service = service;
    }
    @GetMapping("")
    public List<Integer> findAll(){
        List<Integer> IdList = new ArrayList<>();
        for (Issue i : repo.findAll())
            IdList.add(i.getId());
        return IdList;
    }
    @GetMapping("/{id}")
    public Issue findById(@PathVariable Integer id){
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Issue not found"));
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void create(@Valid @RequestBody Issue issue){
        repo.save(issue);
    }
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void update(@RequestBody Issue issue, @PathVariable Integer id){
        if (!repo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Issue not found");
        }
        repo.deleteById(id);
        repo.save(issue);
    }
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        repo.deleteById(id);
    }

    @GetMapping("/statistic")
    public List<IssuesWithCharacters> Statistic() {
        return service.IssuesWithFirstAppearancesPublishedBefore2010();
    }
}

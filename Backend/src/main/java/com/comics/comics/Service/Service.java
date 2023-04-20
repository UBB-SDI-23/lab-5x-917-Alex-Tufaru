package com.comics.comics.Service;

import com.comics.comics.DTO.CharacterAndAvgPageCount;
import com.comics.comics.DTO.IssuesWithCharacters;
import com.comics.comics.Model.Character;
import com.comics.comics.Model.CharacterAppearances;
import com.comics.comics.Model.Comic;
import com.comics.comics.Model.Issue;
import com.comics.comics.Repo.CharactersAppearancesCollectionRepo;
import com.comics.comics.Repo.ComicsCollectionRepo;
import com.comics.comics.Repo.IssuesCollectionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.*;

@org.springframework.stereotype.Service
public class Service {
    // statistics: 1. All the protagonists sorted by the average number of pages of the issues they appear in
    //             2. All the issues with first appearances published before 2010
    @Autowired
    private CharactersAppearancesCollectionRepo appearancesRepo;
    @Autowired
    private ComicsCollectionRepo comicsRepo;
    @Autowired
    private IssuesCollectionRepo issuesRepo;

    public List<CharacterAndAvgPageCount> ProtagonistsSortedByAvgPageCount() {
        List<CharacterAndAvgPageCount> result = new ArrayList<>();
        List<CharacterAppearances> appearances = appearancesRepo.findAll().stream().filter(a -> Objects.equals(a.getRole(), "protagonist")).toList();
        HashMap<Character, List<Issue>> charactersAndIssues = new HashMap<>();
        for (CharacterAppearances a : appearances) {
            Character character = a.getCharacter();
            Issue issue = a.getIssue();
            charactersAndIssues.computeIfAbsent(character, k -> new ArrayList<>());
            charactersAndIssues.get(character).add(issue);
        }
        for (Map.Entry<Character, List<Issue>> entry : charactersAndIssues.entrySet()) {
            float average = 0;
            for (Issue i : entry.getValue()) {
                average += i.getPageCount();
            }
            average /= entry.getValue().size();
            result.add(new CharacterAndAvgPageCount(entry.getKey(), average));
        }
        result = result.stream().sorted(Comparator.comparing(CharacterAndAvgPageCount::getAvgPageCount)).toList();
        return result;
    }

    public List<IssuesWithCharacters> IssuesWithFirstAppearancesPublishedBefore2010() {
        List<IssuesWithCharacters> result = new ArrayList<>();
        List<CharacterAppearances> appearances = appearancesRepo.findAll().stream().filter(a -> a.getIsFirstAppearance() == Boolean.TRUE).toList();
        HashMap<Issue, List<Character>> issuesAndCharacters = new HashMap<>();
        for (CharacterAppearances a : appearances) {
            Issue issue = a.getIssue();
            Character character = a.getCharacter();
            LocalDate date = LocalDate.parse("2010-01-01");
            if (issue.getPublicationDate().isBefore(date)) {
                issuesAndCharacters.computeIfAbsent(issue, k -> new ArrayList<>());
                issuesAndCharacters.get(issue).add(character);
            }
        }
        for (Map.Entry<Issue, List<Character>> entry : issuesAndCharacters.entrySet()) {
            result.add(new IssuesWithCharacters(entry.getKey(), entry.getValue()));
        }
        return result;
    }
    public void addIssuesListToComic(Integer comic_id, List<Integer> issuesIds){
        Comic comic = comicsRepo.findById(comic_id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<Issue> issues = issuesRepo.findAllById(issuesIds);
        for (Issue issue : issues) {
            issue.setSeries(comic);
            issuesRepo.save(issue);
        }
    }
}

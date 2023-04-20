package com.comics.comics;

import com.comics.comics.Controller.ComicsController;
import com.comics.comics.DTO.CharacterAndAvgPageCount;
import com.comics.comics.Model.Character;
import com.comics.comics.Model.CharacterAppearances;
import com.comics.comics.Model.Comic;
import com.comics.comics.Model.Issue;
import com.comics.comics.Repo.CharactersAppearancesCollectionRepo;
import com.comics.comics.Repo.CharactersCollectionRepo;
import com.comics.comics.Repo.ComicsCollectionRepo;
import com.comics.comics.Repo.IssuesCollectionRepo;
import com.comics.comics.Service.Service;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringJUnitConfig
class Lab2ApplicationTests {
    @MockBean
    private CharactersCollectionRepo charactersRepo;
    @MockBean
    private IssuesCollectionRepo issuesRepo;
    @MockBean
    private CharactersAppearancesCollectionRepo appearancesRepo;
    @MockBean
    private ComicsCollectionRepo comicsRepo;
    @MockBean
    private Service service;
    @MockBean
    private ComicsController comicsController;

    @Test
    public void test1() {
        Character michelangelo = new Character(1, "Michelangelo", "Ronin", "Kevin Eastman", "Wish for Death", "The Last Ronin");
        Character damian = new Character(2, "Damian Wayne", "Robin", "Grant Morrison", "Batman and Robin #1", "Prime Earth");
        Character kaecilius = new Character(3, "Kaecilius", "-", "Stan Lee", "Strange Tale #130", "Earth 616");
        charactersRepo.save(michelangelo);
        charactersRepo.save(damian);
        charactersRepo.save(kaecilius);

        Issue wishForDeath = new Issue(1, "Wish for Death", new Comic(), 1, LocalDate.of(2020, 10, 28), 64);
        Issue whenIGrowUp = new Issue(2, "When I Grow Up... : Part one", new Comic(), 1, LocalDate.of(2017, 2, 15), 26);
        Issue doctorStrange = new Issue(3, "Chapter One: The Strange Day", new Comic(), 1, LocalDate.of(2021, 9, 22), 36);
        issuesRepo.save(wishForDeath);
        issuesRepo.save(whenIGrowUp);
        issuesRepo.save(doctorStrange);

        CharacterAppearances appearance1 = new CharacterAppearances(1, wishForDeath, michelangelo, "protagonist", true);
        CharacterAppearances appearance2 = new CharacterAppearances(2, whenIGrowUp, damian, "protagonist", false);
        CharacterAppearances appearance3 = new CharacterAppearances(3, doctorStrange, kaecilius, "antagonist", false);
        appearancesRepo.save(appearance1);
        appearancesRepo.save(appearance2);
        appearancesRepo.save(appearance3);

        CharacterAndAvgPageCount characterAndAvgPageCount1 = new CharacterAndAvgPageCount(michelangelo, 64);
        CharacterAndAvgPageCount characterAndAvgPageCount2 = new CharacterAndAvgPageCount(damian, 26);

        List<CharacterAndAvgPageCount> expected = new ArrayList<>();
        expected.add(characterAndAvgPageCount2);
        expected.add(characterAndAvgPageCount1);

        when(service.ProtagonistsSortedByAvgPageCount()).thenReturn(expected);

        List<CharacterAndAvgPageCount> found = service.ProtagonistsSortedByAvgPageCount();
        assertEquals(found, expected);
    }

    @Test
    public void test2() {
        Comic comic1 = new Comic("Teenage Mutant Ninja Turtles: The Last Ronin", 5, "Kevin Eastman", "IDW Publishing");
        Comic comic2 = new Comic("Super Sons", 16, "Peter Tomasi", "DC");
        comicsRepo.save(comic1);
        comicsRepo.save(comic2);

        List<Comic> expected = new ArrayList<>();
        expected.add(comic2);
        when(comicsController.filterByIssuesNr(10)).thenReturn(expected);

        List<Comic> found = comicsController.filterByIssuesNr(10);
        assertEquals(found, expected);
    }
}

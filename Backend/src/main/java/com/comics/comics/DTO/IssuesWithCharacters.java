package com.comics.comics.DTO;

import com.comics.comics.Model.Character;
import com.comics.comics.Model.Issue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class IssuesWithCharacters {
    private Issue issue;
    private List<Character> characters;
}

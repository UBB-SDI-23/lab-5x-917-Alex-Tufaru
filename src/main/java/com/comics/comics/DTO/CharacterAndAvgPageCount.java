package com.comics.comics.DTO;

import com.comics.comics.Model.Character;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CharacterAndAvgPageCount {
    private Character character;
    private float avgPageCount;
}

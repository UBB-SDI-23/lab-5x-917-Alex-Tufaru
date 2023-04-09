package com.comics.comics.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CHARACTER_APPEARANCES")
public class CharacterAppearances {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "issueId")
    private Issue issue;
    @ManyToOne
    @JoinColumn(name = "characterId")
    private Character character;
    private String role;
    private Boolean isFirstAppearance;
}

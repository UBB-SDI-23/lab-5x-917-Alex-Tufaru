package com.comics.comics.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CHARACTER_TBL")
public class Character {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    @NotBlank(message = "Alias is a mandatory field")
    private String alias;
    private String creator;
    private String firstAppearance;
    private String universe;

    public Integer getId() {
        return id;
    }
}

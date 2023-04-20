package com.comics.comics.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "COMIC")
public class Comic {
    @Id
    @GeneratedValue
    private Integer id;
    @NotBlank(message = "Name is a mandatory field")
    private String name;
    @Min(1)
    private Integer issuesNr;
    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, targetEntity = Issue.class, mappedBy = "series")
    private List<Issue> issues;
    private String author;
    private String publisher;

    public Comic(String name, Integer issuesNr, String author, String publisher) {
        this.name = name;
        this.issuesNr = issuesNr;
        this.author = author;
        this.publisher = publisher;
    }
}

package com.comics.comics.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ISSUE")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Issue {
    @Id
    @GeneratedValue
    private Integer id;
    @NotBlank(message = "Title is a mandatory field")
    private String title;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "series")
    private Comic series;
    @Min(1)
    private Integer issueNr;
    LocalDate publicationDate;
    @Min(1)
    Integer pageCount;
}

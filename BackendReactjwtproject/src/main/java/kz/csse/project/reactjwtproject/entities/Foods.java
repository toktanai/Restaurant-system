package kz.csse.project.reactjwtproject.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "t_foods")
public class Foods {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private int price;


    @Column(name = "status")
    private boolean status;

    @ManyToOne(fetch = FetchType.EAGER)
    private Categories categories;

}

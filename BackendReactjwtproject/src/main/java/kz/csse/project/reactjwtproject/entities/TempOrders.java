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
@Table(name = "t_temp_orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TempOrders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "status")
    private boolean status;

    @ManyToOne(fetch = FetchType.LAZY)
    private Foods foods;

    @ManyToOne(fetch = FetchType.LAZY)
    private Tables tables;

    @Column(name = "amount")
    private double amount;

}

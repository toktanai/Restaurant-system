package kz.csse.project.reactjwtproject.repositories;

import kz.csse.project.reactjwtproject.entities.Foods;
import kz.csse.project.reactjwtproject.entities.Tables;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface FoodRepository extends JpaRepository<Foods, Long> {
    List<Foods> getAllByCategoriesId(Long id);
    List<Foods> getAllByNameContaining(String name);
}

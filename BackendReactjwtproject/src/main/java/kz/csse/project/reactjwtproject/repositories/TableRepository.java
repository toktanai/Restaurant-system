package kz.csse.project.reactjwtproject.repositories;

import kz.csse.project.reactjwtproject.entities.Tables;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface TableRepository extends JpaRepository<Tables, Long> {
}

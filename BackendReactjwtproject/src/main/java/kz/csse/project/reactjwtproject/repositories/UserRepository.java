package kz.csse.project.reactjwtproject.repositories;

import kz.csse.project.reactjwtproject.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public  interface UserRepository extends JpaRepository<Users, Long> {

        Users findByEmail(String email);

}

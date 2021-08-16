package kz.csse.project.reactjwtproject.services.impl;

import kz.csse.project.reactjwtproject.entities.Roles;
import kz.csse.project.reactjwtproject.repositories.RolesRepository;
import kz.csse.project.reactjwtproject.services.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesServiceImpl implements RolesService {
    @Autowired
    private RolesRepository rolesRepository;

    @Override
    public List<Roles> getAllRoles() {
        return rolesRepository.findAll();
    }

    @Override
    public Roles getRole(Long id) {
        return rolesRepository.findById(id).get();
    }

    @Override
    public Roles saveRole(Roles roles) {
        return rolesRepository.save(roles);
    }

    @Override
    public void deleteRole(Roles roles) {
        rolesRepository.delete(roles);
    }
}

package kz.csse.project.reactjwtproject.services;

import kz.csse.project.reactjwtproject.entities.Foods;
import kz.csse.project.reactjwtproject.entities.Roles;

import java.util.List;

public interface RolesService {
    List<Roles> getAllRoles();
    Roles getRole(Long id);
    Roles saveRole(Roles roles);
    void deleteRole(Roles roles);
}

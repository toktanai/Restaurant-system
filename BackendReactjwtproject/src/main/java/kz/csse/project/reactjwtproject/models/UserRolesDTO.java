package kz.csse.project.reactjwtproject.models;

import kz.csse.project.reactjwtproject.entities.Roles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRolesDTO implements Serializable {
    private Long id;
    private String email;
    private String fullName;
    private String password;
    private Long roleId;
}

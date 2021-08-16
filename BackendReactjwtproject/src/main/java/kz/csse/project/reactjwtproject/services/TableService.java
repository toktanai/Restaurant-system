package kz.csse.project.reactjwtproject.services;

import kz.csse.project.reactjwtproject.entities.Tables;

import java.util.List;

public interface TableService {

    List<Tables> getAllTables();
    Tables getTable(Long id);
    Tables saveTable(Tables table);
    void deleteTable(Tables table);
}

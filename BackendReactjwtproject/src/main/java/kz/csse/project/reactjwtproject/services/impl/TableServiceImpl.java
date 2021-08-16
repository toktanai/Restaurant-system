package kz.csse.project.reactjwtproject.services.impl;

import kz.csse.project.reactjwtproject.entities.Tables;
import kz.csse.project.reactjwtproject.repositories.TableRepository;
import kz.csse.project.reactjwtproject.services.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TableServiceImpl implements TableService {

    @Autowired
    private TableRepository tableRepository;

    @Override
    public List<Tables> getAllTables() {
        return tableRepository.findAll();
    }

    @Override
    public Tables getTable(Long id) {
        return tableRepository.findById(id).get();
    }

    @Override
    public Tables saveTable(Tables table) {
        return tableRepository.save(table);
    }

    @Override
    public void deleteTable(Tables table) {
        tableRepository.delete(table);
    }
}

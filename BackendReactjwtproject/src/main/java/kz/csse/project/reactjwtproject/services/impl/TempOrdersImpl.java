package kz.csse.project.reactjwtproject.services.impl;

import kz.csse.project.reactjwtproject.entities.TempOrders;
import kz.csse.project.reactjwtproject.repositories.TableRepository;
import kz.csse.project.reactjwtproject.repositories.TempOrdersRepository;
import kz.csse.project.reactjwtproject.services.TempOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TempOrdersImpl implements TempOrdersService {

    @Autowired
    private TempOrdersRepository tempOrdersRepository;
    @Override
    public List<TempOrders> getAllTempOrders() {
        return tempOrdersRepository.findAll();
    }

    @Override
    public List<TempOrders> getTableTempOrders(Long id) {
        return tempOrdersRepository.getAllByTables(id);
    }

    @Override
    public TempOrders getTempOrders(Long id) {
        return tempOrdersRepository.findById(id).get();
    }

    @Override
    public TempOrders saveTempOrders(TempOrders order) {
        return tempOrdersRepository.save(order);
    }

    @Override
    public void deleteTempOrders(TempOrders order) {
        tempOrdersRepository.delete(order);
    }
}

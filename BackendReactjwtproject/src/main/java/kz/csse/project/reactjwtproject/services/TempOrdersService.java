package kz.csse.project.reactjwtproject.services;

import kz.csse.project.reactjwtproject.entities.Tables;
import kz.csse.project.reactjwtproject.entities.TempOrders;

import java.util.List;

public interface TempOrdersService {

    List<TempOrders> getAllTempOrders();
    List<TempOrders> getTableTempOrders(Long id);
    TempOrders getTempOrders(Long id);
    TempOrders saveTempOrders(TempOrders table);
    void deleteTempOrders(TempOrders table);
}

package kz.csse.project.reactjwtproject.services.impl;

import kz.csse.project.reactjwtproject.entities.Foods;
import kz.csse.project.reactjwtproject.repositories.FoodRepository;
import kz.csse.project.reactjwtproject.services.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public List<Foods> getAllFoods() {
        return foodRepository.findAll();
    }

    @Override
    public Foods getFood(Long id) {
        return foodRepository.findById(id).get();
    }

    @Override
    public Foods saveFood(Foods foods) {
        return foodRepository.save(foods);
    }

    @Override
    public void deleteFood(Foods foods) {
        foodRepository.delete(foods);
    }

    @Override
    public List<Foods> getAllByCategories(Long id) {
        return foodRepository.getAllByCategoriesId(id);
    }

    @Override
    public List<Foods> getAllByNameContaining(String name) {
        return foodRepository.getAllByNameContaining(name);
    }
}

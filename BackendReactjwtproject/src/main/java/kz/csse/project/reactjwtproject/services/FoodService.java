package kz.csse.project.reactjwtproject.services;

import kz.csse.project.reactjwtproject.entities.Categories;
import kz.csse.project.reactjwtproject.entities.Foods;

import java.util.List;

public interface FoodService {
    List<Foods> getAllFoods();
    Foods getFood(Long id);
    Foods saveFood(Foods foods);
    void deleteFood(Foods foods);
    List<Foods> getAllByCategories(Long id);
    List<Foods> getAllByNameContaining(String name);
}

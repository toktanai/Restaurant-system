package kz.csse.project.reactjwtproject.services;

import kz.csse.project.reactjwtproject.entities.Categories;
import kz.csse.project.reactjwtproject.entities.Tables;

import java.util.List;

public interface CategoryService {

    List<Categories> getAllCategories();
    Categories getCategory(Long id);
    Categories saveCategory(Categories categories);
    void deleteCategory(Categories categories);
}


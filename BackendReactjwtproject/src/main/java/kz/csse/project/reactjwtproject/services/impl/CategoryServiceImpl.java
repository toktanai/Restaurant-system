package kz.csse.project.reactjwtproject.services.impl;

import kz.csse.project.reactjwtproject.entities.Categories;
import kz.csse.project.reactjwtproject.repositories.CategoryRepository;
import kz.csse.project.reactjwtproject.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Categories> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Categories getCategory(Long id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public Categories saveCategory(Categories categories) {
        return categoryRepository.save(categories);
    }

    @Override
    public void deleteCategory(Categories categories) {
        categoryRepository.delete(categories);
    }
}

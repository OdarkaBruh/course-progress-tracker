package com.example.demo.service;

import com.example.demo.model.Course;
import com.example.demo.model.Lesson;
import com.example.demo.repository.LessonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {

    private final LessonRepository repository;

    public LessonService(LessonRepository repository) {
        this.repository = repository;
    }

    public List<Lesson> getAll() {
        return repository.findAll();
    }

    public List<Lesson> getByCourseId(Long courseId) {
        return repository.findByCourseId(courseId);
    }

    public Lesson getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
    }
    
    public Lesson create(Lesson lesson) {
        return repository.save(lesson);
    }

    public Lesson update(Long id, Lesson updatedLesson) {
        Lesson lesson = getById(id);

        lesson.setTitle(updatedLesson.getTitle());
        lesson.setDescription(updatedLesson.getDescription());
        lesson.setCourse(updatedLesson.getCourse());
        lesson.setIsCompleted(updatedLesson.getIsCompleted());
        

        return repository.save(lesson);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
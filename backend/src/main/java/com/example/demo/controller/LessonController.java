package com.example.demo.controller;

import com.example.demo.model.Lesson;
import com.example.demo.service.LessonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses/{courseId}/lessons")
public class LessonController {
    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/all")
    public List<Lesson> getAllLessons() {
        return lessonService.getAll();
    }

    @GetMapping("/{id}")
    public Lesson getLessonById(@PathVariable Long id) {
        return lessonService.getById(id);
    }

    @GetMapping
    public List<Lesson> getLessonsByCourse(@PathVariable Long courseId) {
        return lessonService.getByCourseId(courseId);
    }

    @PostMapping
    public Lesson createLesson(@RequestBody Lesson lesson) {
        return lessonService.create(lesson);
    }

    @PutMapping("/{id}")
    public Lesson updateLesson(
            @PathVariable Long id,
            @RequestBody Lesson lesson) {

        return lessonService.update(id, lesson);
    }

    @DeleteMapping("/{id}")
    public void deleteLesson(@PathVariable Long id) {
        lessonService.delete(id);
    }
}
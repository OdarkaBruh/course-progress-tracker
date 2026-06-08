package com.example.demo.service;

import com.example.demo.model.Course;
import com.example.demo.model.Lesson;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.LessonRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;

    public CourseService(
            CourseRepository courseRepository,
            LessonRepository lessonRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
    }

    public List<Course> findAll() {
        List<Course> courses = courseRepository.findAll();
        courses.forEach(course -> {

        course.setNumberOfLessons(
                lessonRepository.countByCourseId(
                        course.getId()));

        course.setCompletedLessons(
                lessonRepository
                        .countByCourseIdAndIsCompletedTrue(
                                course.getId()));
        });
        return courses;
    }

    public Optional<Course> findById(Long id) {
        return courseRepository.findById(id);
    }

    public Course create(Course course) {
        return courseRepository.save(course);
    }

    public Course update(Long id, Course updatedCourse) {
        return courseRepository.findById(id)
                .map(course -> {
                    course.setTitle(updatedCourse.getTitle());
                    course.setDescription(updatedCourse.getDescription());
                    course.setCompletedLessons(updatedCourse.getCompletedLessons());
                    course.setNumberOfLessons(updatedCourse.getNumberOfLessons());
                    return courseRepository.save(course);
                })
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public void delete(Long id) {
    	List<Lesson> lessons = lessonRepository.findByCourseId(id);
    	for (Lesson l: lessons) {
    		lessonRepository.delete(l);
    	}
        courseRepository.deleteById(id);
    }
}
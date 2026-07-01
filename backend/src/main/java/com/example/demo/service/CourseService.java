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
        courses.forEach(course -> {course = updateCourseLessons(course);});
        return courses;
    }

    public Course findById(Long id) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course != null) course = updateCourseLessons(course);
        return course;
    }

    public Course create(Course course) {
        return courseRepository.save(course);
    }

    public Course update(Long id, Course updatedCourse) {
        return courseRepository.findById(id)
                .map(course -> {
                    course.setTitle(updatedCourse.getTitle());
                    course.setDescription(updatedCourse.getDescription());
                    course = updateCourseLessons(course);
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
    
    private Course updateCourseLessons(Course course) {
    	course.setNumberOfLessons(getNumberOfLessons(course.getId()));
    	course.setCompletedLessons(getCompletedLessons(course.getId()));
    	return course;
    }
    
    private int getNumberOfLessons(long courseId) {
    	return (int) lessonRepository.countByCourseId(courseId);
    }
    
    private int getCompletedLessons(long courseId) {
    	return (int)lessonRepository.countByCourseIdAndIsCompletedTrue(courseId);
    }
}
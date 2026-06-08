package com.example.demo.repository;

import com.example.demo.model.Course;
import com.example.demo.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

	List<Lesson> findByCourse(Course course);
    List<Lesson> findByCourseId(Long courseId);
   
    long countByCourseId(Long courseId);
    long countByCourseIdAndIsCompletedTrue(Long courseId);
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Course } from "../models/Course.tsx";
import { deleteCourse, getCourses } from "../service/courseService.tsx";
import CourseCard from "../models/CourseCard.tsx";

const CourseList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const data = await getCourses();
            setCourses(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteCourse(id);

            setCourses((prevCourses) =>
                prevCourses.filter(
                    (course) => course.id !== id
                )
            );
        } catch (error) {
            console.error(error);
            alert("Failed to delete course");
        }
    };

    return (
        <div className="CoursesList">
            <h2>Courses</h2>
            <Link to="/courses/add">Add course</Link>

            {loading ? (
                <p>Loading courses...</p>
            ) : courses.length === 0 ? (
                <p>No courses found.</p>
            ) : (
                courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onDelete={handleDelete}
                        onLessonChanged={loadCourses}
                    />
                ))
            )}
        </div>
    );
};

export default CourseList;
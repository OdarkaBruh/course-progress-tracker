import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "../models/CourseCard";
import { getCourse } from "../service/courseService";
import type { Course } from "../models/Course";

const CoursePage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {
        if (!courseId) return;

        getCourse(Number(courseId))
            .then(setCourse)
            .catch(console.error);
    }, [courseId]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <CourseCard
            course={course}
            onDelete={() => {}}
            onLessonChanged={() => {}}
        />
    );
};

export default CoursePage;
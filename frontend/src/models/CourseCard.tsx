import type {Course} from "./Course";
import LessonList from "../lists/LessonList.tsx";
import {useNavigate} from "react-router-dom";

interface CourseCardProps {
    course: Course;
    onDelete?: (id: number) => void;
    onLessonChanged: () => void;
}

const CourseCard = ({
                        course,
                        onDelete,
                        onLessonChanged,
                    }: CourseCardProps) => {
    const progress =
        course.numberOfLessons > 0
            ? course.completedLessons
            : 1;

    const navigate = useNavigate();

    return (
        <div className="Course">
            <div className="CourseHeader">
                <h3 onClick={() => navigate(`${course.id}`)}>{course.title}</h3>
                <progress
                    value={progress}
                    max={course.numberOfLessons > 0 ? course.numberOfLessons : 1}>{progress}%
                </progress>

                <button
                    onClick={() => onDelete?.(course.id)}
                >
                    X
                </button>
            </div>

            <p>{course.description}</p>

            <small>
                Created:{" "}
                {new Date(course.createdAt).toLocaleString()}
            </small>

            <h4>Lessons</h4>

            <LessonList courseId={course.id} onLessonChanged={onLessonChanged}/>

        </div>
    );
};

export default CourseCard;
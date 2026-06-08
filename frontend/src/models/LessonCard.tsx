import type {Lesson} from "../models/Lesson";
import {useNavigate} from "react-router-dom";

interface LessonCardProps {
    lesson: Lesson;
    courseId: number;
    onDelete: (id: number) => void;
    onToggleCompleted: (
        lesson: Lesson
    ) => void;
}

const LessonCard = ({
                        lesson,
                        courseId,
                        onDelete,
                        onToggleCompleted,
                    }: LessonCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="Lesson">
            <div className="LessonHeader">
                <h4 onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}>{lesson.title}</h4>

                <label>
                    <input
                        type="checkbox"
                        checked={lesson.isCompleted}
                        onChange={() => onToggleCompleted(lesson)}
                    />
                    Completed
                </label>

                <button
                    onClick={() => onDelete(lesson.id)}
                >
                    X
                </button>
            </div>

            <small>
                Created:{" "}
                {new Date(lesson.createdAt).toLocaleString()}
            </small>
        </div>
    );
};

export default LessonCard;
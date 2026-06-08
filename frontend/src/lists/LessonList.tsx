import { useEffect, useState } from "react";
import type { Lesson } from "../models/Lesson.tsx";
import LessonCard from "../models/LessonCard.tsx";
import {
    getLessonsByCourseId,
    deleteLesson,
    updateLesson,
} from "../service/lessonService.tsx";
import { Link } from "react-router-dom";

interface LessonListProps {
    courseId: number;
    onLessonChanged?: () => void;
}

const LessonList = ({ courseId, onLessonChanged }: LessonListProps) => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLessons = async () => {
            try {
                setLoading(true);
                const data = await getLessonsByCourseId(courseId);
                setLessons(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadLessons();
    }, [courseId]);

    const handleDelete = async (id: number) => {
        try {
            await deleteLesson(courseId, id);

            setLessons((prev) =>
                prev.filter((lesson) => lesson.id !== id)
            );
            onLessonChanged?.();
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleCompleted = async (lesson: Lesson) => {
        try {
            const updatedLesson = await updateLesson(courseId, {
                ...lesson,
                isCompleted: !lesson.isCompleted,
            });

            setLessons((prev) =>
                prev.map((l) =>
                    l.id === updatedLesson.id
                        ? updatedLesson
                        : l
                )
            );
            onLessonChanged?.();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Link to={`/courses/${courseId}/lessons/add`}>
                Add lesson
            </Link>

            {loading ? (
                <p>Loading lessons...</p>
            ) : lessons.length === 0 ? (
                <p>No lessons found.</p>
            ) : (
                lessons.map((lesson) => (
                    <LessonCard
                        key={lesson.id}
                        courseId={courseId}
                        lesson={lesson}
                        onDelete={handleDelete}
                        onToggleCompleted={handleToggleCompleted}
                    />
                ))
            )}
        </>
    );
};

export default LessonList;
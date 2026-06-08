import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonCard from "../models/LessonCard";
import { getLesson } from "../service/lessonService";
import type { Lesson } from "../models/Lesson";

const LessonPage = () => {
    const { courseId, lessonId } = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        if (!lessonId) return;

        getLesson(Number(courseId), Number(lessonId))
            .then(setLesson)
            .catch(console.error);
    }, [courseId, lessonId]);

    if (!lesson) {
        return <div>Loading...</div>;
    }

    return (
        <LessonCard
            lesson={lesson}
            courseId={Number(courseId)}
            onDelete={() => {}}
            onToggleCompleted={() => {}}
        />
    );
};

export default LessonPage;
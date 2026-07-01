import axios from "axios";
import type { Lesson } from "../models/Lesson";

const API_URL = `http://localhost:4000/courses`;

export const getLessons = async (courseId: number): Promise<Lesson[]> => {
const response = await axios.get<Lesson[]>(
        `${API_URL}/${courseId}/lessons/all`
    );
    return response.data;
};

export const getLesson = async (
    courseId: number,
    lessonId: number
): Promise<Lesson> => {
    const response = await axios.get<Lesson>(
        `${API_URL}/${courseId}/lessons/${lessonId}`
    );

    return response.data;
};

export const getLessonsByCourseId = async (
    courseId: number
): Promise<Lesson[]> => {
    const response = await axios.get<Lesson[]>(
        `${API_URL}/${courseId}/lessons`
    );

    return response.data;
};

export const createLesson = async (
    courseId: number,
    lesson: Omit<Lesson, "id" | "createdAt">
): Promise<Lesson> => {
    const response = await axios.post<Lesson>(
        `${API_URL}/${courseId}/lessons`,
        lesson
    );

    return response.data;
};

export const updateLesson = async (
    courseId: number,
    lesson: Lesson
): Promise<Lesson> => {
    const response = await axios.put<Lesson>(
        `${API_URL}/${courseId}/lessons/${lesson.id}`,
        lesson
    );
    return response.data;
};

export const deleteLesson = async (
    courseId: number,
    id: number
): Promise<void> => {
    await axios.delete(`${API_URL}/${courseId}/lessons/${id}`);
};

export const toggleIsFinished = async (
    courseId: number,
    lesson: Lesson
): Promise<Lesson> => {
    lesson.isCompleted = !lesson.isCompleted;
    const response = await axios.put<Lesson>(
        `${API_URL}/${courseId}/lessons/${lesson.id}`,
        lesson
    );
    return response.data;
};

import axios from "axios";
import type {Course} from "../models/Course";

const API_URL = "http://localhost:4000/courses";

export interface CreateCourseRequest {
    title: string;
    description: string;
}

export const createCourse = async (
    course: CreateCourseRequest
): Promise<Course> => {
    const response = await axios.post<Course>(
        API_URL,
        course
    );

    return response.data;
};

export const getCourse = async (
    id: number
): Promise<Course> => {
    const response = await axios.get<Course>(
        `${API_URL}/${id}`
    );

    return response.data;
};

export const getCourses = async (): Promise<Course[]> => {
    const response = await axios.get<Course[]>(API_URL);
    return response.data;
};

export const deleteCourse = async (
    id: number
): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateCourse = async (
    id: number,
    course: CreateCourseRequest
): Promise<Course> => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        course
    );

    return response.data;
};
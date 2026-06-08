export interface Lesson {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
    course: {
        id: number;
    };
}
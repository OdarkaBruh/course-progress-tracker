import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { createLesson } from "../service/lessonService.tsx";

const AddLessonForm = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!courseId) {
            alert("Course ID not found");
            return;
        }

        try {
            await createLesson(Number(courseId), {
                title,
                description,
                isCompleted,
                course: {
                    id: Number(courseId),
                },
            });

            navigate("/courses");
        } catch (error) {
            console.error(error);
            alert("Failed to create lesson");
        }
    };

    return (
        <div>
            <h2>Add Lesson</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />
                    <br />

                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={(e) =>
                                setIsCompleted(e.target.checked)
                            }
                        />
                        Completed
                    </label>
                </div>

                <br />

                <button type="submit">
                    Create Lesson
                </button>
            </form>
        </div>
    );
};

export default AddLessonForm;
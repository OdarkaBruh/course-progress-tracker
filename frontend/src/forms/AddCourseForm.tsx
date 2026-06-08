import { useState } from "react";
import { createCourse } from "../service/courseService.tsx";
import { useNavigate } from "react-router-dom";

const AddCourseForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            await createCourse({
                title,
                description,
            });

            alert("Course created successfully!");
            navigate("/courses");
        } catch (error) {
            console.error(error);
            alert("Failed to create course");
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h2>Create Course</h2>
            <div>
                <label>Title</label>
                <br />
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <br />
            <div>
                <label>Description</label>
                <br />
                <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <br />
            <button type="submit">
                Create Course
            </button>
        </form>
        </>
    );
};

export default AddCourseForm;
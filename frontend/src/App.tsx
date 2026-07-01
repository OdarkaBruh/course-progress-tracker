import Courses__list from "./all-courses-page/courses__list.tsx";
import AddFormCourses from "./add-forms/add-form-courses.tsx";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddFormLesson from "./add-forms/add-form-lesson.tsx";
import Course__handler from "./detailed-pages/course-page/course__handler.tsx";
import LessonPage from "./pageElements/LessonPage.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/courses" element={<Courses__list/>}/>
                <Route path="/courses/add" element={<AddFormCourses/>}/>
                <Route path="/courses/:courseId/lessons/add" element={<AddFormLesson/>}/>

                <Route path="/courses/:courseId" element={<Course__handler />}/>
                <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

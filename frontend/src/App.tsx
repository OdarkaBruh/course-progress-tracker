import CourseList from "./lists/CourseList.tsx";
import AddCourseForm from "./forms/AddCourseForm.tsx";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddLessonForm from "./forms/AddLessonForm.tsx";
import CoursePage from "./pageElements/CoursePage.tsx";
import LessonPage from "./pageElements/LessonPage.tsx";

function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/add" element={<AddCourseForm />} />
            <Route path="/courses/:courseId/lessons/add" element={<AddLessonForm />} />

            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App

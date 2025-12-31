import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import StudentPanel from './components/StudentPanel'
import StaffPanel from './components/StaffPanel'
import ExamGenerator from './components/ExamGenerator'
import ExamViews from './components/ExamViews'
import ExamViewModelParent from './components/ExamViewModelParent'
import GetAllExams from './components/GetAllExams'
import ProtectedRoute from './security/ProtectedRoute'
import Layout from './layout/Layout'
import AddStudent from './components/AddStudent'
import StudentManagementParent from './components/StudentManagementParent'
import ReviewStudentAnswers from './components/ReviewStudentAnswers'
import GetStudentGrades from './components/GetStudentGrades'
import GetExamStats from './components/GetExamStats'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/staff" element={
            <ProtectedRoute allowedRole="staff">
              <StaffPanel />
            </ProtectedRoute>
          } />

          <Route path="/staff/generate-exam" element={
            <ProtectedRoute allowedRole="staff">
              <ExamGenerator />
            </ProtectedRoute>
          } />

          <Route path="/staff/view-exams" element={
            <ProtectedRoute allowedRole="staff">
              <ExamViews />
            </ProtectedRoute>
          }>
            <Route path="get-exam" element={<ExamViewModelParent />} />
            <Route path="get-all-exams" element={<GetAllExams />} />
            <Route path="get-exam-stats" element={<GetExamStats />} />
          </Route>

          <Route path="/staff/manage-students" element={
            <ProtectedRoute allowedRole="staff">
              <StudentManagementParent />
            </ProtectedRoute>
          }>
            <Route path="add-student" element={<AddStudent />} />
            <Route path="review-answers" element={<ReviewStudentAnswers />} />
            <Route path="get-grades" element={<GetStudentGrades />} />
          </Route>

          <Route path="/student" element={
            <ProtectedRoute allowedRole="student">
              <StudentPanel />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
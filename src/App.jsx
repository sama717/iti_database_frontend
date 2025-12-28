import './App.css'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentPanel from './components/StudentPanel'
import StaffPanel from './components/StaffPanel'
import ExamGenerator from './components/ExamGenerator';
import ExamViews from './components/ExamViews'
import ExamViewModelParent from './components/ExamViewModelParent'
import GetAllExams from './components/GetAllExams'
import ProtectedRoute from './security/ProtectedRoute'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/staff" element={
          <ProtectedRoute allowedRole="staff">
            <Navbar/>
            <StaffPanel />
          </ProtectedRoute>
        } />
        <Route path="/staff/generate-exam" element={
          <ProtectedRoute allowedRole="staff">
            <Navbar/>
            <ExamGenerator />
          </ProtectedRoute>
        } />

        <Route path="/staff/view-exams" element={
          <ProtectedRoute allowedRole="staff">
            <Navbar/>
            <ExamViews />
          </ProtectedRoute>
        }>
          <Route path="get-exam" element={<ExamViewModelParent />} />
          <Route path="get-all-exams" element={<GetAllExams />} />
        </Route>
        <Route path="/student" element={
          <ProtectedRoute allowedRole="student">
            <Navbar/>
            <StudentPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

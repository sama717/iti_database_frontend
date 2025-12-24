import './App.css'
import Login from './components/Login'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import StudentPanel from './components/StudentPanel'
import StaffPanel from './components/StaffPanel'
import ExamGenerator from './components/ExamGenerator';
import ExamViews from './components/ExamViews'
import ExamViewModelParent from './components/ExamViewModelParent'
import GetAllExams from './components/GetAllExams'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/staff" element={<StaffPanel />} />
        <Route path="/staff/generate-exam" element={<ExamGenerator />} />
        <Route path="/staff/view-exams" element={<ExamViews />}>
            <Route path="get-exam" element={<ExamViewModelParent />} />
            <Route path="get-all-exams" element={<GetAllExams/>} />
        </Route>
        <Route path="/student" element={<StudentPanel/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

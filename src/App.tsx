import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Patients from "./pages/Patients"
import Appointments from "./pages/Appointments"
import Settings from "./pages/Settings"
import MainLayout from "./layouts/MainLayout"
import PatientView from "./pages/PatientView"
// TODO: Review icon library. We have 3 library for icon but how many are actually needed? 
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/patients/:id" element={<PatientView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

export default App

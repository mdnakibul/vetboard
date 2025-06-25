import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Patients from "./pages/Patients"
import Appointments from "./pages/Appointments"
import Settings from "./pages/Settings"
import MainLayout from "./layouts/MainLayout"
import PatientView from "./pages/PatientView"
import Login from "@/pages/Login"
import NotFound from "@/pages/NotFound"
import MedicalRecords from "./pages/MedicalRecords"
// TODO: Review icon library. We have 3 library for icon but how many are actually needed? 
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/patients/:id" element={<PatientView />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

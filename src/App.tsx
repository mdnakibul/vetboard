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
import ProtectedRoute from "./components/ProtectedRoute"
// TODO: Review icon library. We have 3 library for icon but how many are actually needed? 
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
        <Route path="patients" element={<ProtectedRoute>
          <Patients />
        </ProtectedRoute>} />
        <Route path="appointments" element={<ProtectedRoute>
          <Appointments />
        </ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute>
          <Settings />
        </ProtectedRoute>} />
        <Route path="/medical-records" element={<ProtectedRoute>
          <MedicalRecords />
        </ProtectedRoute>} />
        <Route path="/patients/:id" element={<ProtectedRoute>
          <PatientView />
        </ProtectedRoute>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

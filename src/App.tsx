import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import VehicleList from './pages/VehicleList'
import VehicleDetail from './pages/VehicleDetail'
import FinanceCalculator from './pages/FinanceCalculator'
import TestDriveForm from './pages/TestDriveForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route path="/vehicle/:id" element={<VehicleDetail />} />
          <Route path="/finance" element={<FinanceCalculator />} />
          <Route path="/test-drive" element={<TestDriveForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App 
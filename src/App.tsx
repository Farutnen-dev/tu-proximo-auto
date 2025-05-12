import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const VehicleDetail = lazy(() => import('./pages/VehicleDetail'));
const FinanceCalculator = lazy(() => import('./pages/FinanceCalculator'));
const TestDrive = lazy(() => import('./pages/TestDrive'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehicle/:id" element={<VehicleDetail />} />
              <Route path="/vehicle/:id/finance" element={<FinanceCalculator />} />
              <Route path="/vehicle/:id/test-drive" element={<TestDrive />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App; 
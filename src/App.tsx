import { Route, Routes } from 'react-router'
import DashboardDemo from '@/pages/dashboard-demo'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardDemo />} />
    </Routes>
  )
}

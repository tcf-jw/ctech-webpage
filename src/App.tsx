import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { useTheme } from '@/lib/theme-context'
import Home from '@/pages/home'

const DashboardDemo = lazy(() => import('@/pages/dashboard-demo'))

function AppToaster() {
  const { dark } = useTheme()
  return <Toaster theme={dark ? 'dark' : 'light'} position="bottom-right" />
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/demo"
          element={
            <Suspense fallback={null}>
              <DashboardDemo />
            </Suspense>
          }
        />
      </Routes>
      <AppToaster />
    </ThemeProvider>
  )
}

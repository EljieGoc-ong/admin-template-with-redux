import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store, persistor } from './store'

// Lazy load pages for code splitting
import { lazy, Suspense } from 'react'

const Login = lazy(() => import('./pages/Login'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))
const MainLayout = lazy(() => import('./components/layout/MainLayout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Users = lazy(() => import('./pages/Users'))
const Analytics = lazy(() => import('./pages/Analytics'))
const CRM = lazy(() => import('./pages/CRM'))
const Crypto = lazy(() => import('./pages/Crypto'))
const Metrics = lazy(() => import('./pages/Metrics'))
const Widgets = lazy(() => import('./pages/Widgets'))
const Settings = lazy(() => import('./pages/Settings'))

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="crm" element={<CRM />} />
                  <Route path="crypto" element={<Crypto />} />
                  <Route path="users" element={<Users />} />
                  <Route path="metrics" element={<Metrics />} />
                  <Route path="widgets" element={<Widgets />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App

import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/store/api/baseApi'
import authReducer from '@/store/slices/authSlice'
import usersReducer from '@/store/slices/usersSlice'
import dashboardReducer from '@/store/slices/dashboardSlice'
import uiReducer from '@/store/slices/uiSlice'
import { getRolePermissions } from '@/utils/permissions'
import type { User } from '@/types/models'

export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
      users: usersReducer,
      dashboard: dashboardReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    preloadedState: preloadedState as object,
  })
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Record<string, unknown>
  store?: ReturnType<typeof createTestStore>
  initialEntries?: string[]
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    initialEntries,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Router = initialEntries
    ? ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <BrowserRouter>{children}</BrowserRouter>
      )

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  )

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const renderWithAuth = (ui: ReactElement, user: User) => {
  return renderWithProviders(ui, {
    preloadedState: {
      auth: {
        user,
        token: 'mock-token',
        isAuthenticated: true,
        permissions: getRolePermissions(user.role),
      },
    },
  })
}

/* eslint-disable-next-line react-refresh/only-export-components -- test utilities re-export */
export * from '@testing-library/react'

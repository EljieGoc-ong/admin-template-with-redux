import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { whenRehydrated } from './store'

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') return
  const { worker } = await import('./services/mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass',
    quiet: true,
  })
}

async function bootstrap() {
  await enableMocking()
  await whenRehydrated
}

bootstrap().then(() => {
  createRoot(document.getElementById('root')!).render(<App />)
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppInitializer } from './components/AppInitializer';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <AppInitializer>
                  <App />
          </AppInitializer>
  </StrictMode>,
)

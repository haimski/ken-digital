import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from "./AppRoutes"
import './index.css'
import {  LanguageProvider } from './i18n/LanguagesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  </StrictMode>,
)

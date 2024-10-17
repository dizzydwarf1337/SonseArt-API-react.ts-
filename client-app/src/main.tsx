import  { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/routes'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)

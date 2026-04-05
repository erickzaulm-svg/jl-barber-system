import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// Importamos los estilos base de Mantine
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envolvemos toda la app indicando que queremos el tema oscuro por defecto */}
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </React.StrictMode>,
)

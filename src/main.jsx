import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { VisitorProvider } from './context/VisitorContext';
import './index.css';
import App from './App.jsx';
import './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find root element');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <VisitorProvider>
        <BrowserRouter>
          {/* แก้ไข fallback ให้เป็น null เพื่อไม่ให้แสดงข้อความ "Loading..." */}
          <Suspense fallback={null}>
            <App />
          </Suspense>
        </BrowserRouter>
      </VisitorProvider>
    </HelmetProvider>
  </React.StrictMode>
);
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const RootComponent = () => {
  return (
    <StrictMode>
      {/* Render only App since it manages the routes */}
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<RootComponent />);


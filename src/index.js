// Importing relevant dependecies and styles
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

// Creating a root instance for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the root component of the application wrapped in Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);

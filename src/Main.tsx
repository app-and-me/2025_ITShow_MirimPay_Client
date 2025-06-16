import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalLoadingIndicator from './components/GlobalLoadingIndicator'; 
import GlobalStyles from './styles/GlobalStyle';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <GlobalStyles />
    <GlobalLoadingIndicator />
  </React.StrictMode>
);
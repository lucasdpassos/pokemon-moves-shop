// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme();

const handleWebVitals = (metric) => {
  console.log(metric);
};

ReactDOM.render(
  <Provider store={store}>
     <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals(handleWebVitals);

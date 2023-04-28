import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import TransList from './views/TransList.js';
import reportWebVitals from './reportWebVitals';
// const {ipcRenderer, dialog, remote} = window.require('electron'); 

const root = ReactDOM.createRoot(document.getElementById('root'));
 

root.render(
  <React.StrictMode>
    <TransList />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

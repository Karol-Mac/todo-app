import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "C:/Users/BeQuiet/IdeaProjects/Spring-udemy/full_stack-section9/frontend/todo-app/todo-app/node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "C:/Users/karol/IdeaProjects/Spring-udemy/full_stack-section9/frontend/todo-app/todo-app/node_modules/bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

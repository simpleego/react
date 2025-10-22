import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import Library from './chapter_03/Library';
// import Parent from './family/Parent';
//import Family from './family/Parent';
// import Clock from './clock/Clock';

//import CommentList from './chapter_05/CommentList';

//import NotificationList from './chapter_06/NotificationList';
import Counter from './counter/Counter';

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Counter />
    </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

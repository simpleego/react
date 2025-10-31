import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MovieList from './Moive/MovieList';

//import Library from './chapter_03/Library';
// import Parent from './family/Parent';
//import Family from './family/Parent';
// import Clock from './clock/Clock';

//import CommentList from './chapter_05/CommentList';

//import NotificationList from './chapter_06/NotificationList';
// import Counter from './counter/Counter';
// import NameInput from './chapter_06_1/NameInput';
 // import Total from './chapter_06_1/Total';
// import TodoList from './test/TodoList';
// import ExampleComponent from './test/ExampleComponent';

// import UseMemoEx from './chapter_07/UseMemoEx';
// import TextInputWithFocusButton from './chapter_07/TextInputWithFocusButton';
//import MeasureExample from './chapter_07/MeasureExample';
// import Accommodate from './chapter_07/Accommodate';

//import Toogle from './chapter_08/Toogle';
// import MyButton from './chapter_08/MyButton';
// import ConfirmButton from './chapter_08/ConfirmButton';
// import LoginControl from './chapter_09/LoginControl';
// import LandingPage from './chapter_09/LandingPage';

// import AttendanceBook from './chapter_09/AttendanceBook';
import NameForm from './chapter_09/NameForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <NameForm />
    </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

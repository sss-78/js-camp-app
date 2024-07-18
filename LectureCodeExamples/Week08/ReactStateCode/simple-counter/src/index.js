import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Counter from './Counter';
import Counter2 from './LiftingState'
import List from './List';
import Login1 from './Login1'
import Login2 from './Login2'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* This is a comment in jsx */}
    <Counter /> 
    <Counter2 />
    <List />
    <Login1 cn = "username"/>
    <Login2 cn = "username"/>
  </React.StrictMode>
);

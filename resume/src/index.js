import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Content from './components/content';
import './app.less';
import './assets/FontAwesome/css/font-awesome.css';

let App = () => {
  return (
    <div className="container">
      <Header />
      <Content />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app-root')
);


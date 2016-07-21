import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
import resumeData from '../data/resume.json';
import './app.less';

const {
  name, summary, contact, details,
} = resumeData;

let App = () => (
  <div className="container">
    <Header name={name} summary={summary} contact={contact} />
    <Content details={details} />
    <Footer />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app-root')
);


import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
//component
import Application from './components/_components/Application';
//css
import './index.scss';

const App = () => {
  return (
    pug`
      .App
        Application
    `
  );
};

const rootElement = document.getElementById("media-app");
ReactDOM.render(<App />, rootElement);
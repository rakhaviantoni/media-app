import React, {lazy, Suspense, useEffect, useState} from 'react';
import { Route, 
         Redirect,
         BrowserRouter as Router,
         Switch
        } 
from 'react-router-dom'

const Home = lazy(() => import("../Home/Home"));
//not found
const NotFound = lazy(() => import("../Errors/NotFound"));
const loading = <div> Loading... </div>

const componentHome = () => <Home />

const componentNotFound = () => <NotFound />

const Application = () => {
  return (
    pug`
      Suspense(fallback=loading)
        Router
          Switch
            Route(exact path="/" component=componentHome)
            Route(path="*" render=componentNotFound)
    `
  );
};

export default Application;
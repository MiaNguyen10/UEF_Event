import React, { Suspense } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from 'history';
import './i18n';

const history = createBrowserHistory({forceRefresh:true});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <Suspense fallback={(<div>Loading</div>)}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

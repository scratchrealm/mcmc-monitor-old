import { createExtensionContext, LabboxProvider } from 'labbox';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import config from './config.json';
import { MMPlugin } from './extensions/pluginInterface';
import './index.css';
import registerExtensions from './registerExtensions';
import reportWebVitals from './reportWebVitals';

const extensionContext = createExtensionContext<MMPlugin>()
registerExtensions(extensionContext)

const apiConfig = {
  webSocketUrl: `ws://${window.location.hostname}:${config.webSocketPort}`,
  baseSha1Url: `http://${window.location.hostname}:${config.httpPort}/sha1`,
  baseFeedUrl: `http://${window.location.hostname}:${config.httpPort}/feed`
}

ReactDOM.render(
  // <React.StrictMode>
    <LabboxProvider
      extensionContext={extensionContext}
      apiConfig={apiConfig}
    >
      <App />
    </LabboxProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

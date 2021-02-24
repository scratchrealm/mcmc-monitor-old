import { usePlugins } from 'labbox';
import React from 'react';
import './App.css';
import { MainWindowPlugin, MMPlugin } from './python/mcmc_monitor/extensions/pluginInterface';

function App() {
  const plugins = usePlugins<MMPlugin>()
  const mainWindowPlugin = plugins.filter(p => (p.name === 'MainWindow'))[0] as any as MainWindowPlugin
  if (!mainWindowPlugin) throw Error('Unable to find main window plugin.')
  return (
    <div className="App">
      <header className="App-header">
        <mainWindowPlugin.component />
      </header>
    </div>
  );
}

export default App;

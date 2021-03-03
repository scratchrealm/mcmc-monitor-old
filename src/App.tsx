import { LabboxProviderContext, usePlugins } from 'labbox';
import QueryString from 'querystring';
import React, { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import { MainWindowPlugin, MMPlugin } from './python/mcmc_monitor/extensions/pluginInterface';

function App() {
  const plugins = usePlugins<MMPlugin>()
  const mainWindowPlugin = plugins.filter(p => (p.name === 'MainWindow'))[0] as any as MainWindowPlugin
  if (!mainWindowPlugin) throw Error('Unable to find main window plugin.')

  const { serverInfo } = useContext(LabboxProviderContext)

  const location = useLocation()
  const workspaceUri = useMemo(() => {
    const query = QueryString.parse(location.search.slice(1));
    const workspace = (query.workspace as string) || 'default'
    const defaultFeedId = serverInfo?.defaultFeedId
    const workspaceUri = workspace.startsWith('workspace://') ? workspace : (defaultFeedId ? `workspace://${defaultFeedId}/${workspace}` : undefined)
    return workspaceUri
  }, [location.search, serverInfo])
  

  return (
    <div className="App">
      <header className="App-header">
        <mainWindowPlugin.component {...{workspaceUri}}/>
      </header>
    </div>
  );
}

export default App;

import { LabboxProviderContext, usePlugins } from 'labbox';
import QueryString from 'querystring';
import React, { useCallback, useContext, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './App.css';
import { MainWindowPlugin, MMPlugin, WorkspaceRoute } from './python/mcmc_monitor/extensions/pluginInterface';
import { WorkspaceRouteAction, workspaceRouteReducer } from './python/mcmc_monitor/extensions/pluginInterface/WorkspaceRoute';

function App() {
  const plugins = usePlugins<MMPlugin>()
  const mainWindowPlugin = plugins.filter(p => (p.name === 'MainWindow'))[0] as any as MainWindowPlugin
  if (!mainWindowPlugin) throw Error('Unable to find main window plugin.')

  const { serverInfo } = useContext(LabboxProviderContext)

  const location = useLocation()
  const history = useHistory()
  const workspaceUri = useMemo(() => {
    const query = QueryString.parse(location.search.slice(1));
    const workspace = (query.workspace as string) || 'default'
    const defaultFeedId = serverInfo?.defaultFeedId
    const workspaceUri = workspace.startsWith('workspace://') ? workspace : (defaultFeedId ? `workspace://${defaultFeedId}/${workspace}` : undefined)
    return workspaceUri
  }, [location.search, serverInfo])

  const workspaceRoute: WorkspaceRoute = useMemo(() => {
    if (location.pathname.startsWith('/run/')) {
      return {page: 'run', runId: location.pathname.split('/')[2] || ''}
    }
    else {
      return {page: 'main'}
    }
  }, [location.pathname])
  
  // const [workspaceRoute, workspaceRouteDispatch] = useReducer(workspaceRouteReducer, {page: 'main'})

  const workspaceRouteDispatch = useCallback(
    (a: WorkspaceRouteAction) => {
      const newRoute: WorkspaceRoute = workspaceRouteReducer(workspaceRoute, a)
      let path = '/'
      if (newRoute.page === 'main') {
        path = '/'
      }
      else if (newRoute.page === 'run') {
        path = `/run/${newRoute.runId}`
      }
      else {
        path = '/'
      }
      if (location.pathname !== path) {
        history.push({...location, pathname: path})
      }
    },
    [workspaceRoute, history, location]
  )

  return (
    <div className="App">
      <header className="App-header">
        <mainWindowPlugin.component
          {...{workspaceUri, workspaceRoute, workspaceRouteDispatch}}
        />
      </header>
    </div>
  );
}

export default App;

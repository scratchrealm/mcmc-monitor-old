import { usePlugins } from 'labbox';
import React, { FunctionComponent, useCallback, useReducer } from 'react';
import { MainWindowProps, MMPlugin, workspaceRouteReducer } from '../../pluginInterface';
import { workspaceReducer } from '../../pluginInterface/Workspace';
import { useSubfeed } from '../../workspaceview/WorkspaceView/RunPage';
import logo from './logo.svg';

const MainWindow: FunctionComponent<MainWindowProps> = () => {
    const [workspace, workspaceDispatch] = useReducer(workspaceReducer, {runs: []})
    const plugins = usePlugins<MMPlugin>()
    const workspaceViewPlugin = plugins.filter(p => (p.name === 'WorkspaceView'))[0]
    if (!workspaceViewPlugin) throw Error('Unable to find workspace view plugin')

    const handleWorkspaceSubfeedMessage = useCallback((msg: any) => {
        workspaceDispatch(msg)
    }, [])
    useSubfeed('feed://91e20967e11b30db1894a6f8b42d6437215494cd815d3d9b926bcab90f5924a9/~7033bedf6c058a2871dc22bda839652c5abe0097', { onMessage: handleWorkspaceSubfeedMessage })

    const [workspaceRoute, workspaceRouteDispatch] = useReducer(workspaceRouteReducer, {page: 'main'})

    return (
        <div style={{margin: 50}}>
            <img src={logo} className="App-logo" alt="logo" width={20} />
            &nbsp;MCMC Monitor
            <workspaceViewPlugin.component workspace={workspace} workspaceDispatch={workspaceDispatch} workspaceRoute={workspaceRoute} workspaceRouteDispatch={workspaceRouteDispatch} />
        </div>
    )
}

export default MainWindow
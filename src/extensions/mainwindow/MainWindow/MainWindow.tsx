import { useSubfeed } from 'labbox';
import React, { FunctionComponent, useCallback, useReducer } from 'react';
import { MainWindowProps, useWorkspaceViewPlugins, workspaceRouteReducer } from '../../pluginInterface';
import { WorkspaceAction, workspaceReducer } from '../../pluginInterface/Workspace';
import logo from './logo.svg';

const MainWindow: FunctionComponent<MainWindowProps> = () => {
    const workspaceViewPlugin = useWorkspaceViewPlugins().filter(p => (p.name === 'WorkspaceView'))[0]
    if (!workspaceViewPlugin) throw Error('Unable to find workspace view plugin')

    const [workspace, workspaceDispatch2] = useReducer(workspaceReducer, {runs: []})
    const handleWorkspaceSubfeedMessages = useCallback((messages: any[]) => {
        messages.forEach(msg => workspaceDispatch2(msg))
    }, [])
    const {appendMessages: appendWorkspaceMessages} = useSubfeed({feedUri: 'feed://91e20967e11b30db1894a6f8b42d6437215494cd815d3d9b926bcab90f5924a9', subfeedName: '~7033bedf6c058a2871dc22bda839652c5abe0097', onMessages: handleWorkspaceSubfeedMessages })
    const workspaceDispatch = useCallback((a: WorkspaceAction) => {
        appendWorkspaceMessages([a])
    }, [appendWorkspaceMessages])

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
import React, { FunctionComponent } from 'react';
import { WorkspaceViewProps } from '../../pluginInterface';
import MainPage from './MainPage';
import RunPage from './RunPage';


const WorkspaceView: FunctionComponent<WorkspaceViewProps> = ({ workspace, workspaceRoute, workspaceRouteDispatch }) => {
    if (workspaceRoute.page === 'main') {
        return <MainPage workspace={workspace} workspaceRouteDispatch={workspaceRouteDispatch} />
    }
    else if (workspaceRoute.page === 'run') {
        return <RunPage workspace={workspace} runId={workspaceRoute.runId} workspaceRouteDispatch={workspaceRouteDispatch} />
    }
    else {
        throw Error(`Invalid page`)
    }
}

export default WorkspaceView
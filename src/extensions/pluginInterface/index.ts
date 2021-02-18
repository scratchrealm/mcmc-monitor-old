import { BasePlugin, ExtensionContext } from "labbox";
import { FunctionComponent } from "react";
import { WorkspaceDispatch, WorkspaceState } from "./Workspace";

export type MainWindowProps = {
}

export interface MainWindowPlugin extends BasePlugin {
    type: 'MainWindow'
    component: FunctionComponent<MainWindowProps>
}

export type WorkspaceMainPage = {
    page: 'main'
}

export type WorkspaceRunPage = {
    page: 'run'
    runId: string
}

export type WorkspacePage = WorkspaceMainPage | WorkspaceRunPage

export type WorkspaceRoute = WorkspacePage

export type WorkspaceRouteAction = {type: 'gotoPage', page: WorkspacePage}
export type WorkspaceRouteDispatch = (a: WorkspaceRouteAction) => void

export const workspaceRouteReducer = (s: WorkspaceRoute, a: WorkspaceRouteAction): WorkspaceRoute => {
    if (a.type === 'gotoPage') {
        return a.page
    }
    else return s
}

export type WorkspaceViewProps = {
    workspace: WorkspaceState
    workspaceDispatch: WorkspaceDispatch
    workspaceRoute: WorkspaceRoute
    workspaceRouteDispatch: WorkspaceRouteDispatch
}

export interface WorkspaceViewPlugin extends BasePlugin {
    type: 'WorkspaceView'
    component: FunctionComponent<WorkspaceViewProps>
}

export type MMPlugin = MainWindowPlugin | WorkspaceViewPlugin

export type MMExtensionContext = ExtensionContext<MMPlugin>
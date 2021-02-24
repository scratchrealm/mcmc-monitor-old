import { BasePlugin } from "labbox";
import { FunctionComponent } from "react";
import { WorkspaceRoute, WorkspaceRouteDispatch } from ".";
import { WorkspaceDispatch, WorkspaceState } from "./Workspace";

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
import { BasePlugin, ExtensionContext, usePlugins } from "labbox";
import { FunctionComponent, useMemo } from "react";
import { RunViewPlugin } from "./RunViewPlugin";
import { WorkspaceViewPlugin } from "./WorkspaceViewPlugin";
export { workspaceRouteReducer } from './WorkspaceRoute';
export type { WorkspaceRoute, WorkspaceRouteDispatch } from './WorkspaceRoute';
export type { WorkspaceViewProps } from './WorkspaceViewPlugin';

export type MainWindowProps = {
    workspaceUri: string | undefined
}
export interface MainWindowPlugin extends BasePlugin {
    type: 'MainWindow'
    component: FunctionComponent<MainWindowProps>
}

export type MMPlugin = MainWindowPlugin | WorkspaceViewPlugin | RunViewPlugin

export type MMExtensionContext = ExtensionContext<MMPlugin>

export type Iteration = {
    type: 'iteration'
    timestamp: number
    chainId: number
    parameters: {[key: string]: any}
}
export const isIteration = (x: any): x is Iteration => {
    try {
        if ((x.type === 'iteration') && (x.timestamp) && (x.chainId)) return true
        else return false
    }
    catch(err) {
        return false
    }
}

export const useWorkspaceViewPlugins = (): WorkspaceViewPlugin[] => {
    const plugins = usePlugins<MMPlugin>()
    return useMemo(() => (
        plugins.filter(p => (p.type === 'WorkspaceView')).map(p => (p as any as WorkspaceViewPlugin))
    ), [plugins])
}
export const useMainWindowPlugins = (): MainWindowPlugin[] => {
    const plugins = usePlugins<MMPlugin>()
    return useMemo(() => (
        plugins.filter(p => (p.type === 'MainWindow')).map(p => (p as any as MainWindowPlugin))
    ), [plugins])
}
export const useRunViewPlugins = (): RunViewPlugin[] => {
    const plugins = usePlugins<MMPlugin>()
    return useMemo(() => (
        plugins.filter(p => (p.type === 'RunView')).map(p => (p as any as RunViewPlugin))
    ), [plugins])
}
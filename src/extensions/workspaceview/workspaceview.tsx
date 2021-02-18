import { MMExtensionContext } from "../pluginInterface";
import WorkspaceView from "./WorkspaceView/WorkspaceView";

export function activate(context: MMExtensionContext) {
    context.registerPlugin({
        type: 'WorkspaceView',
        name: 'WorkspaceView',
        label: 'Workspace View',
        component: WorkspaceView
    })
}
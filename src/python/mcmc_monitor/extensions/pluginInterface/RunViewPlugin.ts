import { BasePlugin } from "labbox";
import { FunctionComponent } from "react";
import { Iteration } from ".";
import { WorkspaceMCMCRun } from "./Workspace";

export type RunViewProps = {
    run: WorkspaceMCMCRun
    iterations?: Iteration[]
}

export interface RunViewPlugin extends BasePlugin {
    type: 'RunView'
    component: FunctionComponent<RunViewProps>
}
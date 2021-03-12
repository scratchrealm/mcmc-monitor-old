import { BasePlugin } from "labbox";
import { FunctionComponent } from "react";
import { Iteration } from ".";
import { RunSelection, RunSelectionDispatch } from "./RunSelection";
import { WorkspaceMCMCRun } from "./Workspace";

export type RunViewProps = {
    run: WorkspaceMCMCRun
    runSelection: RunSelection
    runSelectionDispatch: RunSelectionDispatch
    iterations?: Iteration[]
}

export interface RunViewPlugin extends BasePlugin {
    type: 'RunView'
    component: FunctionComponent<RunViewProps>
}
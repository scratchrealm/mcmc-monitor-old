export type WorkspaceMCMCRun = {
    runId: string
    runLabel: string
    metaData: string
    uri: string
}

export type WorkspaceState = {
    runs: WorkspaceMCMCRun[]
}

export type AddRunWorkspaceAction = {
    type: 'AddRun'
    run: WorkspaceMCMCRun
}

export type DeleteRunsWorkspaceAction = {
    type: 'DeleteRuns'
    runIds: string[]
}

export type WorkspaceAction = AddRunWorkspaceAction | DeleteRunsWorkspaceAction
export type WorkspaceDispatch = (a: WorkspaceAction) => void

export const workspaceReducer = (s: WorkspaceState, a: WorkspaceAction): WorkspaceState => {
    if (a.type === 'AddRun') {
        return {
            ...s,
            runs: [...s.runs, a.run]
        }
    }
    else if (a.type === 'DeleteRuns') {
        return {
            ...s,
            runs: s.runs.filter(r => (!a.runIds.includes(r.runId)))
        }
    }
    else return s
}
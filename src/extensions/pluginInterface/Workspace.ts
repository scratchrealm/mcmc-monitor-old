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

export type WorkspaceAction = AddRunWorkspaceAction
export type WorkspaceDispatch = (a: WorkspaceAction) => void

export const workspaceReducer = (s: WorkspaceState, a: WorkspaceAction): WorkspaceState => {
    if (a.type === 'AddRun') {
        return {
            ...s,
            runs: [...s.runs, a.run]
        }
    }
    else return s
}
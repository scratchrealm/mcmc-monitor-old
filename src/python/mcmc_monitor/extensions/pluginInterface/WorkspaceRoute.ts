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
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import Hyperlink from '../../common/Hyperlink';
import NiceTable from '../../common/NiceTable';
import { WorkspaceRouteDispatch } from '../../pluginInterface';
import { WorkspaceDispatch, WorkspaceMCMCRun, WorkspaceState } from '../../pluginInterface/Workspace';

type Props = {
    workspace: WorkspaceState
    workspaceDispatch: WorkspaceDispatch
    workspaceRouteDispatch: WorkspaceRouteDispatch
}

const RunLink: FunctionComponent<{run: WorkspaceMCMCRun, onClick: (run: WorkspaceMCMCRun) => void}> = ({run, onClick}) => {
    const handleClick = useCallback(() => {
        onClick(run)
    }, [onClick, run])
    return <Hyperlink onClick={handleClick}>{run.runLabel}</Hyperlink>
}

const MainPage: FunctionComponent<Props> = ({workspace, workspaceDispatch, workspaceRouteDispatch}) => {
    const handleRunClick = useCallback((run: WorkspaceMCMCRun) => {
        workspaceRouteDispatch({type: 'gotoPage', page: {page: 'run', runId: run.runId}})
    }, [workspaceRouteDispatch])
    const rows = useMemo(() => (workspace.runs.slice().reverse().map(r => ({
        key: r.runId,
        columnValues: {
            label: {
                text: r.runLabel,
                element: <span style={{marginRight: 5, whiteSpace: 'nowrap'}}><RunLink run={r} onClick={handleRunClick} /></span>
            },
            uri: r.uri
        }
    }))), [workspace.runs, handleRunClick])
    const columns = useMemo(() => ([
        {
            key: 'label',
            label: 'Run'
        },
        {
            key: 'uri',
            label: 'URI'
        }
    ]), [])
    const handleDeleteRun = useCallback((runId: string) => {
        workspaceDispatch({type: 'DeleteRuns', runIds: [runId]})
    }, [workspaceDispatch])
    return (
        <div>
            <NiceTable
                rows={rows}
                columns={columns}
                onDeleteRow={handleDeleteRun}
                noConfirmDeleteRow={true}
            />
        </div>
    )
}

export default MainPage
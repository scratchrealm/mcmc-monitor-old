import React, { FunctionComponent, useCallback, useMemo } from 'react';
import Hyperlink from '../../common/Hyperlink';
import { formatTimestamp } from '../../common/misc';
import NiceTable from '../../common/NiceTable';
import { WorkspaceRouteDispatch } from '../../pluginInterface';
import { WorkspaceDispatch, WorkspaceMCMCRun, WorkspaceState } from '../../pluginInterface/Workspace';

type Props = {
    workspace: WorkspaceState
    workspaceDispatch: WorkspaceDispatch
    workspaceRouteDispatch: WorkspaceRouteDispatch
}

const RunLink: FunctionComponent<{run: WorkspaceMCMCRun, onClick: (run: WorkspaceMCMCRun) => void, label: string}> = ({run, onClick, label}) => {
    const handleClick = useCallback(() => {
        onClick(run)
    }, [onClick, run])
    return <Hyperlink onClick={handleClick}>{label}</Hyperlink>
}

const MainPage: FunctionComponent<Props> = ({workspace, workspaceDispatch, workspaceRouteDispatch}) => {
    const handleRunClick = useCallback((run: WorkspaceMCMCRun) => {
        workspaceRouteDispatch({type: 'gotoPage', page: {page: 'run', runId: run.runId}})
    }, [workspaceRouteDispatch])
    const columns = useMemo(() => ([
        {
            key: 'runId',
            label: 'Run'
        },
        {
            key: 'label',
            label: 'Label'
        },
        {
            key: 'timestamp',
            label: 'Timestamp'
        }
    ]), [])
    const rows = useMemo(() => (workspace.runs.slice().reverse().map(r => ({
        key: r.runId,
        columnValues: {
            runId: {
                text: r.runId,
                element: <span style={{marginRight: 5, whiteSpace: 'nowrap'}}><RunLink run={r} label={r.runId} onClick={handleRunClick} /></span>
            },
            label: {
                text: r.runLabel,
                element: <span style={{marginRight: 5, whiteSpace: 'nowrap'}}><RunLink run={r} label={r.runLabel} onClick={handleRunClick} /></span>
            },
            timestamp: {
                text: r.timestamp ? formatTimestamp(r.timestamp, {useAgoForRecent: true}) : ''
            }
        }
    }))), [workspace.runs, handleRunClick])
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
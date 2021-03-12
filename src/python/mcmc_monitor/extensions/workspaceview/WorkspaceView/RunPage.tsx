import { useSubfeed } from 'labbox';
import React, { FunctionComponent, useCallback, useMemo, useReducer } from 'react';
import Hyperlink from '../../common/Hyperlink';
import { isIteration, Iteration, useRunViewPlugins, WorkspaceRouteDispatch } from '../../pluginInterface';
import { initialRunSelection, runSelectionReducer } from '../../pluginInterface/RunSelection';
import { WorkspaceState } from '../../pluginInterface/Workspace';



const parseSubfeedUri = (uri: string | undefined) => {
    if (!uri) return {feedUri: undefined, subfeedName: undefined}
    const list = uri.split('/')
    return {feedUri: list.slice(0, 3).join('/'), subfeedName: list[3]}
}

const RunPage:  FunctionComponent<{workspace: WorkspaceState, runId: string, workspaceRouteDispatch: WorkspaceRouteDispatch}> = ({workspace, runId, workspaceRouteDispatch}) => {
    const run = useMemo(() => (workspace.runs.filter(r => (r.runId === runId))[0]), [runId, workspace.runs])
    const {feedUri: runFeedUri, subfeedName: runSubfeedName} = parseSubfeedUri(run?.uri)
    const {messages, loadedInitialMessages} = useSubfeed({feedUri: runFeedUri, subfeedName: runSubfeedName})
    const iterations: Iteration[] | undefined = useMemo(() => (loadedInitialMessages ? messages.filter(msg => isIteration(msg)): undefined), [messages, loadedInitialMessages]) 

    const handleBack = useCallback(() => {
        workspaceRouteDispatch({type: 'gotoPage', page: {page: 'main'}})
    }, [workspaceRouteDispatch])

    const rvPlugins = useRunViewPlugins()

    const [runSelection, runSelectionDispatch] = useReducer(runSelectionReducer, initialRunSelection)

    if (!run) return <div>Run not found: {runId}</div>

    return (
        <div>
            <Hyperlink onClick={handleBack}>Back</Hyperlink>
            {
                loadedInitialMessages ? (
                    <span>
                        {
                            rvPlugins.map(p => (
                                <div style={{paddingBottom: 30}}>
                                    <p.component
                                        key={p.name}
                                        run={run}
                                        iterations={iterations}
                                        runSelection={runSelection}
                                        runSelectionDispatch={runSelectionDispatch}
                                    />
                                </div>
                            ))
                        }
                    </span>
                ) : (
                    <div>Loading...</div>
                )
            }
        </div>
    )
}

// const IterationsTable: FunctionComponent<{iterations: Iteration[]}> = ({iterations}) => {
//     const iteration0 = iterations[0]
//     const parameterKeys = useMemo(() => {
//         if (!iteration0) return []
//         return Object.keys(iteration0.parameters || {})
//     }, [iteration0])
//     const rows = useMemo(() => (
//         iterations.map((it, ii) => {
//             const columnValues: {[key: string]: any} = {
//                 timestamp: formatTimestamp(it.timestamp),
//                 chainId: it.chainId + ''
//             }
//             for (let pk of parameterKeys) {
//                 columnValues['param-' + pk] = it.parameters[pk]
//             }
//             return {
//                 key: ii + '',
//                 columnValues
//             }
//         })
//     ), [iterations, parameterKeys])
//     const columns = useMemo(() => (
//         [{
//             key: 'chainId',
//             label: 'Chain'
//         },
//         {
//             key: 'timestamp',
//             label: 'Timestamp'
//         }, ...parameterKeys.map(pk => ({
//             key: 'param-' + pk,
//             label: pk
//         }))]
//     ), [parameterKeys])
//     return (
//         <NiceTable
//             rows={rows}
//             columns={columns}
//         />
//     )
// }

export default RunPage
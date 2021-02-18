import { LabboxProviderContext } from 'labbox';
import React, { FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Hyperlink from '../../common/Hyperlink';
import NiceTable from '../../common/NiceTable';
import { WorkspaceRouteDispatch } from '../../pluginInterface';
import { WorkspaceState } from '../../pluginInterface/Workspace';

interface SubfeedManagerInterface {
    getMessages: (subfeedUri: string, position: number, opts: {waitMsec: number}) => Promise<any[]>
}

class Subfeed {
    messages: any[] = []
    loadedInitialMessages = false
    _changeCallbacks: (() => void)[] = []
    _active = false
    constructor(private uri: string | undefined, private subfeedManager: SubfeedManagerInterface) {
        this._active = true
        this._start()
    }
    onChange(callback: () => void) {
        this._changeCallbacks.push(callback)
    }
    cleanup() {
        this._active = false
    }
    async _start() {
        if (!this.uri) return
        while (this._active) {
            const msgs = await this.subfeedManager.getMessages(this.uri, this.messages.length, {waitMsec: 3000})
            if (msgs.length > 0) {
                this.messages = [...this.messages, ...msgs]
                this._changeCallbacks.forEach(cb => cb())
            }
            else {
                if (!this.loadedInitialMessages) {
                    this.loadedInitialMessages = true
                    this._changeCallbacks.forEach(cb => cb())
                }
            }
            await sleepMsec(100)
        }
    }
}

export const useSubfeed = (uri: string | undefined, opts?: {onMessage?: (msg: any) => void}) => {
    const { subfeedManager } = useContext(LabboxProviderContext)
    const [messages, setMessages] = useState<any[]>([])
    const [loadedInitialMessages, setLoadedInitialMessages] = useState<boolean>(false)
    const { onMessage } = opts || {}
    useEffect(() => {
        let lastMessageReportedIndex = 0
        const subfeed = new Subfeed(uri, subfeedManager)
        const reportMessages = () => {
            while (lastMessageReportedIndex < subfeed.messages.length) {
                if (onMessage) {
                    onMessage(subfeed.messages[lastMessageReportedIndex])
                }
                lastMessageReportedIndex ++
            }
        }
        subfeed.onChange(() => {
            setMessages(subfeed.messages)
            setLoadedInitialMessages(subfeed.loadedInitialMessages)
            reportMessages()
        })
        setMessages(subfeed.messages)
        setLoadedInitialMessages(subfeed.loadedInitialMessages)
        reportMessages()
        return () => {
            subfeed.cleanup()
        }
    }, [subfeedManager, uri, onMessage])
    return {messages, loadedInitialMessages}
}

type Iteration = {
    type: 'iteration'
    timestamp: number
    parameters: {[key: string]: any}
}
const isIteration = (x: any): x is Iteration => {
    try {
        if ((x.type === 'iteration') && (x.timestamp)) return true
        else return false
    }
    catch(err) {
        return false
    }
}

const RunPage:  FunctionComponent<{workspace: WorkspaceState, runId: string, workspaceRouteDispatch: WorkspaceRouteDispatch}> = ({workspace, runId, workspaceRouteDispatch}) => {
    const run = useMemo(() => (workspace.runs.filter(r => (r.runId === runId))[0]), [runId, workspace.runs])
    const {messages, loadedInitialMessages} = useSubfeed(run?.uri)
    const iterations: Iteration[] = messages.filter(msg => isIteration(msg))

    const handleBack = useCallback(() => {
        workspaceRouteDispatch({type: 'gotoPage', page: {page: 'main'}})
    }, [workspaceRouteDispatch])

    if (!run) return <div>Run not found: {runId}</div>

    return (
        <div>
            <Hyperlink onClick={handleBack}>Back</Hyperlink>
            {
                loadedInitialMessages ? (
                    <span>
                        <h3>{iterations.length} iterations</h3>
                        <IterationsTable
                            iterations={iterations}
                        />
                    </span>
                ) : (
                    <div>Loading...</div>
                )
            }
        </div>
    )
}

const IterationsTable: FunctionComponent<{iterations: Iteration[]}> = ({iterations}) => {
    const iteration0 = iterations[0]
    const parameterKeys = useMemo(() => {
        if (!iteration0) return []
        return Object.keys(iteration0.parameters || {})
    }, [iteration0])
    const rows = useMemo(() => (
        iterations.map((it, ii) => {
            const columnValues: {[key: string]: any} = {timestamp: it.timestamp}
            for (let pk of parameterKeys) {
                columnValues['param-' + pk] = it.parameters[pk]
            }
            return {
                key: ii + '',
                columnValues
            }
        })
    ), [iterations, parameterKeys])
    console.log('--- rows', rows)
    const columns = useMemo(() => (
        [{
            key: 'timestamp',
            label: 'Timestamp'
        }, ...parameterKeys.map(pk => ({
            key: 'param-' + pk,
            label: pk
        }))]
    ), [parameterKeys])
    return (
        <NiceTable
            rows={rows}
            columns={columns}
        />
    )
}

const sleepMsec = (m: number) => new Promise(r => setTimeout(r, m));

export default RunPage
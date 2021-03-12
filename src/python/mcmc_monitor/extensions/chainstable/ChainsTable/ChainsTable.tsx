import { FunctionComponent, useCallback, useMemo } from "react"
import NiceTable from "../../common/NiceTable"
import { Iteration } from "../../pluginInterface"
import { RunSelection, RunSelectionDispatch } from "../../pluginInterface/RunSelection"

class ParameterStats {
    _data: {[key: string]: {count: number, sum: number, sumsqr: number}} = {}
    addParameterValue(parameterName: string, value: number) {
        if (!(parameterName in this._data)) {
            this._data[parameterName] = {count: 0, sum: 0, sumsqr: 0}
        }
        this._data[parameterName].count ++
        this._data[parameterName].sum += value
        this._data[parameterName].sumsqr += value * value
    }
    parameterNames() {
        return Object.keys(this._data).sort()
    }
    parameterStats(parameterName: string) {
        return {...this._data[parameterName]}
    }
    getMean(parameterName: string) {
        const a = this._data[parameterName]
        if (!a) return NaN
        if (!a.count) return NaN
        return a.sum / a.count
    }
}

type Props = {
    iterations: Iteration[]
    runSelection: RunSelection
    runSelectionDispatch: RunSelectionDispatch
}

const ChainsTable: FunctionComponent<Props> = ({iterations, runSelection, runSelectionDispatch}) => {
    const {chains, overallParameterStats} = useMemo(() => {
        const overallParameterStats = new ParameterStats()
        const x: {[key: string]: {iterationCount: number, parameterStats: ParameterStats}} = {}
        iterations.forEach(it => {
            const chainId = it.chainId
            if (!((chainId + '') in x)) {
                x[chainId + ''] = {iterationCount: 1, parameterStats: new ParameterStats()}
            }
            x[chainId + ''].iterationCount ++
            for (let pname in it.parameters) {
                x[chainId + ''].parameterStats.addParameterValue(pname, it.parameters[pname])
            }
            for (let pname in it.parameters) {
                overallParameterStats.addParameterValue(pname, it.parameters[pname])
            }
        })
        const chainIds = Object.keys(x).sort().map(k => Number(k))
        return {
            chains: chainIds.map(chainId => ({
                chainId,
                ...x[chainId + '']
            })),
            overallParameterStats
        }
    }, [iterations])
    const parameterStyle = useCallback((pname: string): React.CSSProperties => {
        if (runSelection.selectedParameterNames.includes(pname)) return {color: 'darkgreen', fontWeight: 'bold'}
        else return {}
    }, [runSelection.selectedParameterNames])
    const columns = useMemo(() => {
        const style: React.CSSProperties = {fontWeight: 'bold'}
        return [
            {
                key: 'chainId',
                label: 'Chain',
                element: <span style={style}><br />Chain</span>
            },
            {
                key: 'iterationCount',
                label: 'Num. iterations',
                element: <span style={style}><br />Num. iterations</span>
            },
            ...overallParameterStats.parameterNames().map(pname => ({
                key: 'param__' + pname,
                label: 'mean ' + pname,
                element: <span style={{...style, ...parameterStyle(pname)}}>mean<br />{pname}</span>
            }))
        ]
    }, [overallParameterStats, parameterStyle])
    
    const rows = useMemo(() => (
        chains.map((ch, ii) => {
            const columnValues: {[key: string]: any} = {
                chainId: ch.chainId + '',
                iterationCount: ch.iterationCount
            }
            ch.parameterStats.parameterNames().forEach(pname => {
                const val = Number(ch.parameterStats.getMean(pname)).toPrecision(4)
                columnValues['param__' + pname] = {
                    text: val + '',
                    element: <span style={{...parameterStyle(pname)}}>{val}</span>
                }
            })
            return {
                key: ch.chainId + '',
                columnValues
            }
        })
    ), [chains, parameterStyle])
    const handleSelectedRowsChanged = useCallback((selectedRowIds: string[]) => {
        runSelectionDispatch({
            type: 'setSelectedChainIds',
            selectedChainIds: selectedRowIds.map(x => Number(x))
        })
    }, [runSelectionDispatch])
    const selectedRowKeys = useMemo(() => (runSelection.selectedChainIds.map(x => (x + ''))), [runSelection.selectedChainIds])
    return (
        <NiceTable
            rows={rows}
            columns={columns}
            selectionMode="multiple"
            selectedRowKeys={selectedRowKeys}
            onSelectedRowKeysChanged={handleSelectedRowsChanged}
        />
    )
}

export default ChainsTable
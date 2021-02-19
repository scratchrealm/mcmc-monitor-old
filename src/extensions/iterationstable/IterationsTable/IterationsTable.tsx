import { FunctionComponent, useMemo } from "react"
import NiceTable from "../../common/NiceTable"
import { Iteration } from "../../pluginInterface"

const IterationsTable: FunctionComponent<{iterations: Iteration[]}> = ({iterations}) => {
    const iteration0 = iterations[0]
    const parameterKeys = useMemo(() => {
        if (!iteration0) return []
        return Object.keys(iteration0.parameters || {})
    }, [iteration0])
    const rows = useMemo(() => (
        iterations.map((it, ii) => {
            const columnValues: {[key: string]: any} = {
                timestamp: formatTimestamp(it.timestamp),
                chainId: it.chainId + ''
            }
            for (let pk of parameterKeys) {
                columnValues['param-' + pk] = it.parameters[pk]
            }
            return {
                key: ii + '',
                columnValues
            }
        })
    ), [iterations, parameterKeys])
    const columns = useMemo(() => (
        [{
            key: 'chainId',
            label: 'Chain'
        },
        {
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

const formatTimestamp = (timestamp: number) => {
    const x = new Date(timestamp * 1000);
    return x.toISOString()
}

export default IterationsTable
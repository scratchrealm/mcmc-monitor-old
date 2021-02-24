import { FunctionComponent, useMemo } from "react"
import NiceTable from "../../common/NiceTable"
import { Iteration } from "../../pluginInterface"

const ChainsTable: FunctionComponent<{iterations: Iteration[]}> = ({iterations}) => {
    const chains = useMemo((): {chainId: number, iterationCount: number}[] => {
        const x: {[key: string]: {iterationCount: number}} = {}
        iterations.forEach(it => {
            const chainId = it.chainId
            if ((chainId + '') in x) {
                x[chainId + ''].iterationCount ++
            }
            else {
                x[chainId + ''] = {iterationCount: 1}
            }
        })
        const chainIds = Object.keys(x).sort().map(k => Number(k))
        return chainIds.map(chainId => ({
            chainId,
            ...x[chainId + '']
        }))
    }, [iterations])
    const rows = useMemo(() => (
        chains.map((ch, ii) => {
            const columnValues: {[key: string]: any} = {
                chainId: ch.chainId + '',
                iterationCount: ch.iterationCount
            }
            return {
                key: ch.chainId + '',
                columnValues
            }
        })
    ), [chains])
    const columns = useMemo(() => (
        [{
            key: 'chainId',
            label: 'Chain'
        },
        {
            key: 'iterationCount',
            label: 'Num. iterations'
        }]
    ), [])
    return (
        <NiceTable
            rows={rows}
            columns={columns}
        />
    )
}

export default ChainsTable
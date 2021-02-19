import { FunctionComponent, useMemo } from "react";
import Expandable from "../../common/Expandable";
import { Iteration } from "../../pluginInterface";
import { RunViewProps } from "../../pluginInterface/RunViewPlugin";
import IterationsTable from "./IterationsTable";

const IterationsTableView: FunctionComponent<RunViewProps> = ({ run, iterations }) => {
    const chains = useMemo((): {chainId: number, iterations: Iteration[]}[] => {
        const x: {[key: string]: {iterations: Iteration[]}} = {}
        ;(iterations || []).forEach((it: Iteration) => {
            const chainId = it.chainId
            if ((chainId + '') in x) {
                x[chainId + ''].iterations.push(it)
            }
            else {
                x[chainId + ''] = {iterations: []}
            }
        })
        const chainIds = Object.keys(x).sort().map(k => Number(k))
        return chainIds.map(chainId => ({
            chainId,
            ...x[chainId + '']
        }))
    }, [iterations])
    return (
        <div>
            {
                chains.map(chain => (
                    <Expandable key={chain.chainId} label={`Iterations table for chain ${chain.chainId}`} unmountOnExit={true}>
                        <div style={{height: 300, overflow: 'auto'}}>
                            <IterationsTable
                                iterations={chain.iterations}
                            />
                        </div>
                    </Expandable>
                ))
            }
        </div>
    )
}

export default IterationsTableView
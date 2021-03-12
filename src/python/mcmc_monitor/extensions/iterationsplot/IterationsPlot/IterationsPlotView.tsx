import { FunctionComponent, useMemo } from "react";
import { Iteration } from "../../pluginInterface";
import { RunViewProps } from "../../pluginInterface/RunViewPlugin";
import IterationsPlot from "./IterationsPlot";
import RunParameterSelector from "./RunParameterSelector";

const IterationsPlotView: FunctionComponent<RunViewProps> = ({ run, iterations, runSelection, runSelectionDispatch }) => {
    const chains = useMemo((): {chainId: number, iterations: Iteration[]}[] => {
        const x: {[key: string]: {iterations: Iteration[]}} = {}
        ;(iterations || []).forEach((it: Iteration) => {
            const chainId = it.chainId
            if (runSelection.selectedChainIds.includes(chainId)) {
                if (!((chainId + '') in x)) {
                    x[chainId + ''] = {iterations: []}
                }
                x[chainId + ''].iterations.push(it)
            }
        })
        const chainIds = Object.keys(x).sort().map(k => Number(k))
        return chainIds.map(chainId => ({
            chainId,
            ...x[chainId + '']
        }))
    }, [iterations, runSelection.selectedChainIds])
    return (
        <div>
            <RunParameterSelector {...{iterations, runSelection, runSelectionDispatch}}/>
            {
                (chains.length > 0) ? (
                    chains.map(chain => (
                        <div>
                            <h3>Chain {chain.chainId}</h3>
                            {
                                runSelection.selectedParameterNames.map(pname => (
                                    <IterationsPlot
                                        iterations={chain.iterations}
                                        paramKey={pname}
                                        markerColor={'darkgreen'}
                                    />
                                ))
                            }
                        </div>
                    ))
                ) : (
                    <div>Select one or more chains to view iteration plots</div>
                )
            }
        </div>
    )
}

export default IterationsPlotView